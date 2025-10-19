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
export function mainFunction(props: Props): number  {
    let result: ProcessResult | null = null;

    if (props.itemBased) {
        result = processItemBased(props);
    } else {
        result = processUserBased(props);
    }

    if (!result) return;
    result.distances.sort()

    return switchPrediction(props.prediction, result.targetIndex, result.distances, props.maxNeighbors, props.itemBased);
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
        const { value, row, col } = collection[i];

        // console.log(`${type} [${i}] -> valor: (${typeof value}) "${value}", posición: [fila=${row}, col=${col}]` );

        if (value === unknownSymbol) {
            const targetIndex = type === "fila" ? row : col;
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

/**
 * Caso: recorrido por columnas (Item-Based)
 */
function processItemBased(props: Props) {
    const useMatrixInfo = useMatrixInfoStore();
    const firstCol = useMatrixInfo.getCol(0);

    const targetCol = findTargetIndex(firstCol, "columna");
    if (targetCol === null) return;

    const totalCols = firstCol?.length ?? 0;
    const distances = calculateDistances(targetCol, totalCols, props.algorithm, true);
    return { targetIndex: targetCol, distances };
}

/**
 * Caso: recorrido por filas (User-Based) is currently working
 */
function processUserBased(props: Props): ProcessResult {
    const useMatrixInfo = useMatrixInfoStore();
    const firstRow = useMatrixInfo.getRow(0);

    const targetRow = findTargetIndex(firstRow, "fila");
    if (targetRow === null) return;

    const totalRows = firstRow?.length ?? 0;
    const distances = calculateDistances(targetRow, totalRows, props.algorithm, false);
    return { targetIndex: targetRow, distances };
}
