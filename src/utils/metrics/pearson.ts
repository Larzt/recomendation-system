import { useMatrixInfoStore } from "@/store";
import { unknownSymbol } from "@/constants";

/**
 * Calculates the Pearson correlation coefficient between two rows or two columns.
 * Ignores unknown values represented by unknownSymbol.
 *
 * @param Index1 - Index of the first row/column.
 * @param Index2 - Index of the second row/column.
 * @param isColumn - If true, correlation is calculated between columns (items); otherwise, between rows (users).
 * @returns The Pearson correlation coefficient or undefined if not computable.
 */
export function pearsonCorrelation(Index1: number, Index2: number, isColumn = false): number | undefined {
  const matrixInfo = useMatrixInfoStore();

  // Get the proper mean functions depending on the mode
  const Mean1 = isColumn ? matrixInfo.getColMean(Index1) : matrixInfo.getRowMean(Index1);
  const Mean2 = isColumn ? matrixInfo.getColMean(Index2) : matrixInfo.getRowMean(Index2);
  if (Mean1 === undefined || Mean2 === undefined) return undefined;

  // Get the data vectors (row or column)
  const data1 = isColumn ? matrixInfo.getCol(Index1) : matrixInfo.getRow(Index1);
  const data2 = isColumn ? matrixInfo.getCol(Index2) : matrixInfo.getRow(Index2);
  if (!data1 || !data2) return undefined;

  let numerator = 0;
  let denominator1 = 0;
  let denominator2 = 0;

  for (let i = 0; i < data1.length; i++) {
    const val1 = data1[i]?.value;
    const val2 = data2[i]?.value;

    // Skip unknown or invalid values
    if (val1 === unknownSymbol || val2 === unknownSymbol) continue;
    if (typeof val1 !== "number" || typeof val2 !== "number") continue;

    numerator += (val1 - Mean1) * (val2 - Mean2);
    denominator1 += (val1 - Mean1) ** 2;
    denominator2 += (val2 - Mean2) ** 2;
  }

  const denominator_result = Math.sqrt(denominator1) * Math.sqrt(denominator2);
  if (denominator_result === 0) return undefined;

  return numerator / denominator_result;
}
