import { useMatrixInfoStore } from "@/store";
import { unknownSymbol } from "@/constants";

/**
 * Calculates cosine distance between two rows or two columns.
 * Ignores unknown values represented by unknownSymbol.
 *
 * @param Index1 - Index of the first row/column.
 * @param Index2 - Index of the second row/column.
 * @param isColumn - If true, calculates between columns (items); otherwise, between rows (users).
 * @returns Cosine distance (range: 0 to 1) or undefined if not computable.
 */
export function cosineSimilarity(Index1: number, Index2: number, isColumn = false): number | undefined {
  const matrixInfo = useMatrixInfoStore();

  // Select vectors depending on mode
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

    numerator += val1 * val2;
    denominator1 += val1 ** 2;
    denominator2 += val2 ** 2;
  }

  const denominator_result = Math.sqrt(denominator1) * Math.sqrt(denominator2);
  if (denominator_result === 0) return undefined;

  return numerator / denominator_result;
}
