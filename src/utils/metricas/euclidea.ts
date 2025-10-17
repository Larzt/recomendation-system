import type { ItemInfo } from "@/store/fileInfoStore";
import { useMatrixInfoStore } from "@/store";
import { unknownSymbol } from "@/constants";

// Función para calcular la distancia euclídea entre dos vectores (filas de la matriz).
// Ignora los valores desconocidos representados por unknownSymbol.

export function euclideanDistance(Row1: number, Row2: number, Item: boolean = false): number | undefined {
  const matrixInfo = useMatrixInfoStore();
  let Mean1 = matrixInfo.getRowMean(Row1);
  let Mean2 = matrixInfo.getRowMean(Row2);
  if (Item){
    Mean1 = matrixInfo.getiMean(Row1);
    Mean2 = matrixInfo.getiMean(Row2);
  }
  if (Mean1 === undefined || Mean2 === undefined) return undefined;

  let Data1;
  let Data2;
  if (Item) {
    Data1 = matrixInfo.geti(Row1);
    Data2 = matrixInfo.geti(Row2);
  } else {
    Data1 = matrixInfo.getRow(Row1);
    Data2 = matrixInfo.getRow(Row2);
  }

  
  if (!Data1 || !Data2) return undefined;

  let numerator = 0;
  let denominator1 = 0;
  let denominator2 = 0;
  let denominator_result = 0;

  for (let i = 0; i < Data1.length; i++) {
    // const temp = ((Data1[i]?.value - Mean1)) * ((Data2[i]?.value - Mean2)) as number;
    if (Data1[i]?.value === unknownSymbol || Data2[i]?.value === unknownSymbol) continue;
    numerator = (Data1[i]?.value as number - Mean1) * (Data2[i]?.value as number - Mean2);
    // numerator += temporal;
    // numerator_x += (Data1[i]?.value as number - Mean1) ** 2;
    // numerator_y += (Data2[i]?.value as number - Mean2) ** 2;
  }
  for (let i = 0; i < Data1.length; i++) {
    if (Data1[i]?.value === unknownSymbol) continue;
    if (typeof Data1[i]?.value !== 'number') continue;
    denominator1 += (Data1[i]?.value as number - Mean1) ** 2; // ** 2 is exponentiation operator
    denominator2 += (Data2[i]?.value as number - Mean2) ** 2;
  }
  denominator_result = Math.sqrt(denominator1) * Math.sqrt(denominator2);
  
  if (denominator_result === 0) return undefined;
  return numerator / denominator_result;
  /// TODO: en este caso no se ha tenido en cuenta si un valor de la fila es unknownSymbol y no está al final. 
  // Comprobar qué hacer
}
    