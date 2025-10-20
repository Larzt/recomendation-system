import { useMatrixInfoStore } from "@/store";
import { unknownSymbol } from "@/constants";
import { getNeighborRating } from "./getNeighborRating";

/**
 * Predicts the rating of an item for a user using the "difference with the mean" approach.
 *
 * Formula:
 *  r̂(u,i) = r̄(u) + Σ(sim(u,v) * (r(v,i) - r̄(v))) / Σ(|sim(u,v)|)
 *
 * @param targetIndex - Index of the target column/row (the item/user we want to predict)
 * @param elementIndex - Index of the element (column for user-based, row for item-based) being predicted
 * @param neighbors - Array of neighbors with their distance values [{ index, distance }]
 * @param itemBased - If true, works with columns (items); otherwise, with rows (users)
 * @returns The predicted rating or undefined if not computable.
 */

interface DifferenceProps {
    targetIndex: number;
    elementIndex: number;
    neighbors: Array<TNeighbor>;
    itemBased: boolean;
}

export function predictDifferenceWithMean(props: DifferenceProps): number | undefined {
    const matrixInfo = useMatrixInfoStore();
    const { targetIndex, elementIndex, neighbors, itemBased } = props;

    let numerator = 0;
    let denominator = 0;

    for (const neighbor of neighbors) {
        const distance = neighbor.distance;
        if (distance === undefined || Number.isNaN(distance)) {
            console.log("Skipping neighbor: distance is undefined or NaN");
            continue;
        }
        
        const neighborMean = !itemBased
            ? matrixInfo.getRowMean(neighbor.index)
            : matrixInfo.getColMean(neighbor.index);

        if (neighborMean === undefined) {
            console.log("Skipping neighbor: mean undefined");
            continue;
        }

        const rating = getNeighborRating(neighbor, elementIndex, matrixInfo, itemBased, unknownSymbol);
        if (rating === null) continue;

        numerator += distance * (rating - neighborMean);
        denominator += Math.abs(distance);
    }

    if (denominator === 0) {
        console.log("Denominator is 0, returning undefined");
        return undefined;
    }

    const mainMean = !itemBased
        ? matrixInfo.getRowMean(targetIndex)
        : matrixInfo.getColMean(targetIndex);

    if (mainMean === undefined) {
        console.log("mainMean undefined, returning undefined");
        return undefined;
    }

    return mainMean + numerator / denominator;
}
