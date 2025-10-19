import type { ItemInfo } from "@/store/fileInfoStore";
import { useMatrixInfoStore } from "@/store";
import { unknownSymbol } from "@/constants";

/**
 * Predicts the rating of an item for a user using the "difference with the mean" approach.
 *
 * Formula:
 *  r̂(u,i) = r̄(u) + Σ(sim(u,v) * (r(v,i) - r̄(v))) / Σ(|sim(u,v)|)
 *
 * @param targetIndex - Index of the target column/row (the item/user we want to predict)
 * @param neighbors - Array of neighbors with their similarity values [{ index, similarity }]
 * @param isColumn - If true, works with columns (items); otherwise, with rows (users)
 * @returns The predicted rating or undefined if not computable.
 */
export function predictDifferenceWithMean(
  targetIndex: number,
  neighbors: { index: number; similarity: number }[],
  isColumn = false
): number | undefined {
  const matrixInfo = useMatrixInfoStore();

  let numerator = 0;
  let denominator = 0;

  for (const neighbor of neighbors) {
    const sim = neighbor.similarity;
    if (sim === undefined || Number.isNaN(sim)) continue;

    // Get the neighbor's row/column data and mean
    const neighborData = isColumn
      ? matrixInfo.getRow(neighbor.index) // item-based → rows are users
      : matrixInfo.getCol(neighbor.index); // user-based → columns are items

    const neighborMean = isColumn
      ? matrixInfo.getRowMean(neighbor.index)
      : matrixInfo.getColMean(neighbor.index);

    if (!neighborData || neighborMean === undefined) continue;

    // Get the rating of the neighbor for the target element
    const rating = isColumn
      ? neighborData[targetIndex]?.value // user-based filtering
      : neighborData[targetIndex]?.value; // item-based filtering

    if (rating === undefined || rating === unknownSymbol || typeof rating !== "number") continue;

    numerator += sim * (rating - neighborMean);
    denominator += Math.abs(sim);
  }

  if (denominator === 0) return undefined;
  // calculate the mean of the main element
  const meanMain = isColumn
    ? matrixInfo.getRowMean(targetIndex)
    : matrixInfo.getColMean(targetIndex);
  if (meanMain === undefined) return undefined;
  return meanMain + numerator / denominator;
}
