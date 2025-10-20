import {useMatrixInfoStore} from '@/store';
import {unknownSymbol} from '@/constants';
import {euclideanDistance, pearsonCorrelation, cosineSimilarity, predictDifferenceWithMean, predictSimple} from './';


interface ProcessResult {
    targetIndex: number;
    distances: Array<{ index: number; distance: number }>;
}
interface Props {
    algorithm: TAlgorithm;
    maxNeighbors: number;
    itemBased: boolean;
    prediction: TPrediction;
}


/// TODO: no se si poner esta funcion aqui o en otro archivo
export function switchAlgorithm(algorithm: TAlgorithm, Row1: number, Row2: number, Item: boolean = false): number | undefined  { 
  switch (algorithm) {
    case 'euclidean':
      return euclideanDistance(Row1, Row2, Item);
    case 'pearson':
       return pearsonCorrelation(Row1, Row2, Item);
     case 'cosine':
       return cosineSimilarity(Row1, Row2, Item);
    default:
      return undefined;
  }
}
export function switchPrediction(prediction: TPrediction, targetIndex, neighbors, maxNeighbors, itemBased: boolean): number {
    const clamped = neighbors.slice(0, maxNeighbors);
    switch (prediction) {
        case 'difference':
            return predictDifferenceWithMean({targetIndex, neighbors: clamped, itemBased});
        case 'simple':
            return predictSimple({targetIndex, neighbors: clamped, itemBased});
        default:
            return undefined;
    }
}


// funcion principal que realiza switch entre algoritmos de recomendacion
export function mainFunction(props: Props): void {
    const matrixInfo = useMatrixInfoStore();
    
    console.log("=== Iniciando predicción de todas las celdas desconocidas ===");
    
    // Contador para evitar loops infinitos
    let maxIterations = 1000;
    let iteration = 0;
    
    // Repetir mientras haya celdas con unknownSymbol
    while (iteration < maxIterations) {
        iteration++;
        
        // Buscar la siguiente celda con unknownSymbol
        let foundUnknown = false;
        let unknownRow = -1;
        let unknownCol = -1;
        
        // Recorrer toda la matriz buscando unknownSymbol
        outerLoop: for (let row = 0; row < matrixInfo.matrix.length; row++) {
            const rowData = matrixInfo.matrix[row];
            if (!rowData) continue;
            
            for (let col = 0; col < rowData.length; col++) {
                if (rowData[col]?.value === unknownSymbol) {
                    unknownRow = row;
                    unknownCol = col;
                    foundUnknown = true;
                    break outerLoop;
                }
            }
        }
        
        // Si no se encontró ningún unknownSymbol, terminar
        if (!foundUnknown) {
            console.log(`✅ Todas las celdas desconocidas han sido predichas. Total de iteraciones: ${iteration - 1}`);
            break;
        }
        
        console.log(`\n--- Iteración ${iteration}: Prediciendo celda [${unknownRow}, ${unknownCol}] ---`);
        
        // Calcular predicción para esta celda
        let result: ProcessResult | null = null;
        
        if (props.itemBased) {
            // Item-based: trabajar con la columna
            const totalCols = matrixInfo.getCol(0)?.length ?? 0;
            const distances = calculateDistances(unknownCol, totalCols, props.algorithm, true);
            result = { targetIndex: unknownCol, distances };
        } else {
            // User-based: trabajar con la fila
            const totalRows = matrixInfo.matrix.length;
            const distances = calculateDistances(unknownRow, totalRows, props.algorithm, false);
            result = { targetIndex: unknownRow, distances };
        }
        
        if (!result) {
            console.warn(`⚠️ No se pudo calcular predicción para [${unknownRow}, ${unknownCol}]`);
            // Actualizar con un valor por defecto para evitar loop infinito
            matrixInfo.setPosition(unknownRow, unknownCol, 0);
            continue;
        }
        
        result.distances.sort((a, b) => b.distance - a.distance); // Ordenar de mayor a menor similitud
        let predictValue = switchPrediction(props.prediction, result.targetIndex, result.distances, props.maxNeighbors, props.itemBased);
        
        // Redondear a 2 decimales
        if (predictValue !== undefined) {
            const roundedValue = Math.round((predictValue + Number.EPSILON) * 100) / 100;
            predictValue = roundedValue;
            console.log(`Valor predicho para [${unknownRow}, ${unknownCol}]: ${predictValue}`);
            
            // Actualizar la matriz con el valor predicho
            matrixInfo.setPosition(unknownRow, unknownCol, predictValue);
        } else {
            console.warn(`⚠️ Predicción undefined para [${unknownRow}, ${unknownCol}], usando 0`);
            matrixInfo.setPosition(unknownRow, unknownCol, 0);
        }
    }
    
    if (iteration >= maxIterations) {
        console.error(`❌ Se alcanzó el máximo de iteraciones (${maxIterations}). Puede haber un problema.`);
    }
    
    console.log("\n=== Matriz final después de todas las predicciones ===");
    matrixInfo.showMatrix();
}


/**
 * Busca el índice objetivo (fila o columna) que contiene el símbolo desconocido.
 */
function findTargetIndex(
    collection: IItemInfo[],
    type: "fila" | "columna"
): number | null {
    if (!collection || collection.length === 0) return null;

    for (let i = 0; i < collection.length; i++) {
        const { value, row, col } = collection[i]; // Desestructura para obtener el valor, fila y columna

        // console.log(`${type} [${i}] -> valor: (${typeof value}) "${value}", posición: [fila=${row}, col=${col}]` );

        if (value === unknownSymbol) {
            const targetIndex = type === "fila" ? row : col; // Determina el índice objetivo según el tipo
            console.log(`${type} objetivo encontrada en el índice ${targetIndex}`);
            return targetIndex;
        }
    }

    console.warn(`⚠️ No se encontró ${type} con símbolo desconocido.`);
    return null;
}


/**
 * Calcula las distancias entre el índice objetivo y el resto.
 */
function calculateDistances(baseIndex: number, totalCount: number, algorithm: TAlgorithm, isItemBased: boolean ): Array<{ index: number; distance: number }> {
    console.log("--- calculateDistances ---")
    const useMatrixInfo = useMatrixInfoStore();
    const target = useMatrixInfo.getRow(baseIndex);
    console.log(target)

    const distances: Array<{ index: number; distance: number }> = [];

    for (let i = 0; i < totalCount; i++) {
        if (i === baseIndex) continue;
        const distance = switchAlgorithm(algorithm, baseIndex, i, isItemBased) as number;
        distances.push({index: i, distance});
//        console.log(
//            `Distancia entre ${isItemBased ? "columna" : "fila"} ${baseIndex} y ${
//                isItemBased ? "columna" : "fila"
//            } ${i}: ${distance}`
//        );
    }

    return distances;
}

function getAllCells(): IItemInfo[] {
    const cells: IItemInfo[] = [];
    useMatrixInfoStore().matrix.forEach((row) => {
        row.forEach((cell) => {
            cells.push(cell);
        });
    });
    return cells;
}
/**
 * Caso: recorrido por columnas (Item-Based)
 */
function processItemBased(props: Props) {
    const useMatrixInfo = useMatrixInfoStore();
    const allCells = getAllCells();
    const targetCol = findTargetIndex(allCells, "columna");
    if (targetCol === null) return;

    const totalCols = useMatrixInfo.getCol(0)?.length ?? 0;
    const distances = calculateDistances(targetCol, totalCols, props.algorithm, true);
    return { targetIndex: targetCol, distances };
}

/**
 * Caso: recorrido por filas (User-Based) is currently working
 */
function processUserBased(props: Props): ProcessResult {
    const useMatrixInfo = useMatrixInfoStore();
    const allCells = getAllCells();
    const targetRow = findTargetIndex(allCells, "fila");
    if (targetRow === null) return;
    
    const totalRows = useMatrixInfo.matrix.length;
    const distances = calculateDistances(targetRow, totalRows, props.algorithm, false);
    return { targetIndex: targetRow, distances };
}
