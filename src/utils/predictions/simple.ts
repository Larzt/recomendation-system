import { useMatrixInfoStore } from "@/store";
import { unknownSymbol } from "@/constants";
import { getNeighborRating } from "./getNeighborRating"

/**
 * Predicts the rating of an item for a user using the "simple" approach.
 *
 * Formula:
 *  r̂(u,i) = Σ(sim(u,v) * r(v,i) / Σ(|sim(u,v)|)
 *
 * @param targetIndex - Index of the target column/row (the item/user we want to predict)
 * @param elementIndex - Index of the element (column for user-based, row for item-based) being predicted
 * @param neighbors - Array of neighbors with their distance values [{ index, distance }]
 * @param itemBased - If true, works with columns (items); otherwise, with rows (users)
 * @returns The predicted rating or undefined if not computable.
 */

interface SimpleProps {
    targetIndex: number;
    elementIndex: number;
    neighbors: Array<TNeighbor>;
    itemBased: boolean;
}


export function predictSimple(props: SimpleProps): number | undefined {
    const matrixInfo = useMatrixInfoStore();
    const { targetIndex, elementIndex, neighbors, itemBased } = props;

    let numerator = 0;
    let denominator = 0;

    for (const neighbor of neighbors) {
        const sim = neighbor.distance;
        console.log("Neighbor:", neighbor, "sim:", sim);

        if (sim === undefined || Number.isNaN(sim)) {
            console.log("Skipping neighbor: sim is undefined or NaN");
            continue;
        }

        const rating = getNeighborRating(neighbor, elementIndex, matrixInfo, itemBased, unknownSymbol);
        if (rating === null) continue;

        numerator += sim * rating;
        denominator += Math.abs(sim);

        console.log(`Running sum => numerator: ${numerator}, denominator: ${denominator}`);
    }

    if (denominator == 0) {
        console.log("Denominator is 0, returning undefined");
        return undefined;
    }

    const mainMean = !itemBased
        ? matrixInfo.getRowMean(targetIndex)
        : matrixInfo.getColMean(targetIndex);
    console.log("mainMean:", mainMean);

    if (mainMean === undefined) {
        console.log("mainMean undefined, returning undefined");
        return undefined;
    }

    return numerator / denominator;
}
