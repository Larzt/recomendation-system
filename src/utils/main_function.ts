import { useMatrixInfoStore } from '@/store';
import { unknownSymbol } from '@/constants';

import { euclideanDistance } from './metricas/euclidea';


interface Props {
  Algorithm: TAlgorithm;
  Neighbors: number;
  ItemBased: boolean;
  Prediction: TPrediction;
}

/// TODO: no se si poner esta funcion aqui o en otro archivo 
export function switchAlgorithm(algorithm: TAlgorithm, Row1: number, Row2: number, Item: boolean = false): number | undefined  { 
  switch (algorithm) {
    case 'euclidean':
      return euclideanDistance(Row1, Row2, Item);
    // case 'pearson':
    //   return pearsonCorrelation(Row1, Row2, Item);
    // case 'coseno':
    //   return cosineSimilarity(Row1, Row2, Item);
    default:
      return undefined;
  }
}
export function switchPrediction(prediction: TPrediction, ) {
  switch (prediction) {
    case 'meanDifference':
      // return meanDifferencePrediction();
      break;
    case 'simple':
      // return simplePrediction();
      break;
    default:
      return undefined;
  }
}
// funcion principal que realiza switch entre algoritmos de recomendacion
export function mainFunction(props: Props) {
<<<<<<< Updated upstream
  const matrixInfo = useMatrixInfoStore();
  let RoworCol1: number;
  let RoworCol2: number;
  if (props.ItemBased) { // en caso de recorrido en columnas
    // recorrer las columnas
    matrixInfo.getRow(0)?.forEach((element, colIndex) => {
      // buscar cual es la columna objetivo (la primera que tenga unknownSymbol)
      if (!element) return; // por si hay columnas vacías
      if (element.value === unknownSymbol) {
        RoworCol1 = colIndex;
        console.log(`Columna objetivo encontrada en el índice ${RoworCol1}`);
        // calcular la similitud entre columnas
      }
    });
    // calcular las metricas de similitud entre columnas
    const distances: Array<{ index: number; distance: number }> = []; // array para almacenar las distancias (índices y valores)
    matrixInfo.getRow(0)?.forEach((element, colIndex) => {
      if (colIndex !== RoworCol1) {
        RoworCol2 = colIndex;
        const distance = switchAlgorithm(props.Algorithm, RoworCol1 as number, RoworCol2 as number, props.ItemBased) as number;
        distances.push({ index: RoworCol2, distance });
        console.log(`Distancia entre columna ${RoworCol1} y columna ${RoworCol2}: ${distance}`);
      }
    });
    // ordenar las distancias de mayor a menor
    distances.sort((a, b) => b.distance - a.distance);
    console.log('Distancias ordenadas:', distances);
    // coger los N vecinos más cercanos
    const neighbors = distances.slice(0, props.Neighbors); // slice para coger los N primeros elementos empezando desde el índice 0
    // neighbors es un array de objetos con el índice y la distancia
    console.log('Vecinos más cercanos:', neighbors);
    // aplicar la formula de prediccion
    // const meanCol_taget = matrixInfo.getColMean(RoworCol1 as number);
    // let numerator = 0;
    // let denominator = 0;
    // neighbors.forEach((neighbor) => {
    //   const meanCol_neighbor = matrixInfo.getColMean(neighbor.index);
      
    /// TODO: completar la prediccion segun el tipo (hacer llamada al switchPrediction)







  } else { // en caso de recorrido en filas
    // recorrer las filas
    matrixInfo.getCol(0)?.forEach((element, rowIndex) => {
      // buscar cual es la fila objetivo (la primera que tenga unknownSymbol)
      if (!element) return; // por si hay filas vacías
      if (element.value === unknownSymbol) {
        RoworCol1 = rowIndex;
        console.log(`Fila objetivo encontrada en el índice ${RoworCol1}`);
        // calcular la similitud entre filas
      }
    });
    // calcular las metricas de similitud entre filas
    const distances: Array<{ index: number; distance: number }> = []; // array para almacenar las distancias (índices y valores)
    matrixInfo.getCol(0)?.forEach((element, rowIndex) => {
      if (rowIndex !== RoworCol1) {
        RoworCol2 = rowIndex;
        const distance = switchAlgorithm(props.Algorithm, RoworCol1 as number, RoworCol2 as number, props.ItemBased) as number;
        distances.push({ index: RoworCol2, distance });
        console.log(`Distancia entre fila ${RoworCol1} y fila ${RoworCol2}: ${distance}`);
      }
    });
    // ordenar las distancias de mayor a menor
    distances.sort((a, b) => b.distance - a.distance);
    console.log('Distancias ordenadas:', distances);
    // coger los N vecinos más cercanos
    const neighbors = distances.slice(0, props.Neighbors); // slice para coger los N primeros elementos empezando desde el índice 0
    console.log('Vecinos más cercanos:', neighbors);
    // aplicar la formula de prediccion

    /// TODO: completar la prediccion segun el tipo (hacer llamada al switchPrediction)
  }
  // coger los N vecinos más cercanos
  
=======
    const matrixInfo = useMatrixInfoStore();
    if (props.ItemBased) {
        processItemBased(matrixInfo, props);
    } else {
        processUserBased(matrixInfo, props);
    }
}

/**
 * Busca el índice objetivo (fila o columna) que contiene el símbolo desconocido.
 */
function findTargetIndex(
    collection: Array<any> | undefined,
    getValue: (el: any) => any,
    unknownSymbol: string,
    type: "fila" | "columna"
): number | null {
    if (!collection) return null;

    for (let i = 0; i < collection.length; i++) {
        const element = collection[i];
        if (element && getValue(element) === unknownSymbol) {
            console.log(`${type} objetivo encontrada en el índice ${i}`);
            return i;
        }
    }
    return null;
}

/**
 * Calcula las distancias entre el índice objetivo y el resto.
 */
function calculateDistances(
    matrixInfo: ReturnType<typeof useMatrixInfoStore>,
    baseIndex: number,
    totalCount: number,
    algorithm: string,
    isItemBased: boolean
): Array<{ index: number; distance: number }> {
    const distances: Array<{ index: number; distance: number }> = [];

    for (let i = 0; i < totalCount; i++) {
        if (i === baseIndex) continue;

        const distance = switchAlgorithm(algorithm, baseIndex, i, isItemBased) as number;
        distances.push({ index: i, distance });
        console.log(
            `Distancia entre ${isItemBased ? "columna" : "fila"} ${baseIndex} y ${
                isItemBased ? "columna" : "fila"
            } ${i}: ${distance}`
        );
    }

    return distances;
}

/**
 * Caso: recorrido por columnas (Item-Based)
 */
function processItemBased(matrixInfo: ReturnType<typeof useMatrixInfoStore>, props: Props) {
    const firstRow = matrixInfo.getRow(0);
    const unknownSymbol = matrixInfo.unknownSymbol ?? "?";

    const targetCol = findTargetIndex(firstRow, (el) => el.value, unknownSymbol, "columna");
    if (targetCol === null) return;

    const totalCols = firstRow?.length ?? 0;
    calculateDistances(matrixInfo, targetCol, totalCols, props.Algorithm, true);
}

/**
 * Caso: recorrido por filas (User-Based)
 */
function processUserBased(matrixInfo: ReturnType<typeof useMatrixInfoStore>, props: Props) {
    const firstCol = matrixInfo.getCol(0);
    const unknownSymbol = matrixInfo.unknownSymbol ?? "?";

    const targetRow = findTargetIndex(firstCol, (el) => el.value, unknownSymbol, "fila");
    if (targetRow === null) return;

    const totalRows = firstCol?.length ?? 0;
    calculateDistances(matrixInfo, targetRow, totalRows, props.Algorithm, false);
>>>>>>> Stashed changes
}
