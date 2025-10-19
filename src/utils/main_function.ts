import { useMatrixInfoStore } from '@/store';
import { unknownSymbol } from '@/constants';

import { euclideanDistance } from './metricas/euclidea';
import { pearsonCorrelation } from './metricas/pearson';
import { cosenoDistance } from './metricas/coseno';



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
    case 'pearson':
       return pearsonCorrelation(Row1, Row2, Item);
     case 'cosine':
       return cosenoDistance(Row1, Row2, Item);
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
    collection: Array<IItemInfo>,
    getValue: (element: IItemInfo) => IItemInfo['value'],

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
    algorithm: TAlgorithm,
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

    const targetCol = findTargetIndex(firstRow, (el) => el.value, "columna");
    if (targetCol === null) return;

    const totalCols = firstRow?.length ?? 0;
    calculateDistances(matrixInfo, targetCol, totalCols, props.Algorithm, true);
}

/**
 * Caso: recorrido por filas (User-Based)
 */
function processUserBased(matrixInfo: ReturnType<typeof useMatrixInfoStore>, props: Props) {
    const firstCol = matrixInfo.getCol(0);

    const targetRow = findTargetIndex(firstCol, (el) => el.value, "fila");
    if (targetRow === null) return;

    const totalRows = firstCol?.length ?? 0;
    calculateDistances(matrixInfo, targetRow, totalRows, props.Algorithm, false);
}
