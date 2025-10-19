import type { ItemInfo } from "@/store/fileInfoStore";
import { useMatrixInfoStore } from "@/store";
import { unknownSymbol } from "@/constants";



/**
 * Predicts simple.
 */
export function predictSimple(
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

    numerator += sim * (rating);
    denominator += Math.abs(sim);
  }

  if (denominator === 0) return undefined;

  return  numerator / denominator;
}
