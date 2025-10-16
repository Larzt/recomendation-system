import type { ItemInfo } from "@/store/fileInfoStore";
import { useMatrixInfoStore } from "@/store";
import { unknownSymbol } from "@/constants";

// Función para calcular la distancia euclídea entre dos vectores (filas de la matriz).
// Ignora los valores desconocidos representados por unknownSymbol.

export function euclideanDistance(Row1: number, Row2: number): number | undefined {
  const matrixInfo = useMatrixInfoStore();
  const Mean1 = matrixInfo.getRowMean(Row1);
  const Mean2 = matrixInfo.getRowMean(Row2);
  if (Mean1 === undefined || Mean2 === undefined) return undefined;

  const rowData1 = matrixInfo.getRow(Row1);
  const rowData2 = matrixInfo.getRow(Row2);
  if (!rowData1 || !rowData2) return undefined;

  let numerator = 0;
  let denominator1 = 0;
  let denominator2 = 0;
  let denominator_result = 0;

  for (let col = 0; col < rowData1.length; col++) {
    // const temp = ((rowData1[col]?.value - Mean1)) * ((rowData2[col]?.value - Mean2)) as number;
    if (rowData1[col]?.value === unknownSymbol || rowData2[col]?.value === unknownSymbol) continue;
    if (typeof rowData1[col]?.value !== 'number' || typeof rowData2[col]?.value !== 'number') continue;
    numerator = (rowData1[col]?.value as number - Mean1) * (rowData2[col]?.value as number - Mean2);
    // numerator += temporal;
    // numerator_x += (rowData1[col]?.value as number - Mean1) ** 2;
    // numerator_y += (rowData2[col]?.value as number - Mean2) ** 2;
  }
  for (let col = 0; col < rowData1.length; col++) {
    if (rowData1[col]?.value === unknownSymbol) continue;
    if (typeof rowData1[col]?.value !== 'number') continue;
    denominator1 += (rowData1[col]?.value as number - Mean1) ** 2; // ** 2 is exponentiation operator
    denominator2 += (rowData2[col]?.value as number - Mean2) ** 2;
  }
  denominator_result = Math.sqrt(denominator1) * Math.sqrt(denominator2);
  
  if (denominator_result === 0) return undefined;
  return numerator / denominator_result;
  /// TODO: en este caso no se ha tenido en cuenta si un valor de la fila es unknownSymbol y no está al final. 
  /// Comprobar qué hacer
}
    