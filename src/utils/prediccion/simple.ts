import { useMatrixInfoStore } from "@/store";
import { unknownSymbol } from "@/constants";

interface PredictSimpleProps {
    targetIndex: number;
    elementIndex: number; // Index of the element (column for user-based, row for item-based) being predicted
    neighbors: Array<{ index: number; distance: number }>;
    itemBased: boolean;
}


/**
 * Predicts simple.
 */
export function predictSimple(props: PredictSimpleProps): number | undefined {
    const matrixInfo = useMatrixInfoStore();
    const { targetIndex, elementIndex, neighbors, itemBased } = props;
    console.log("=== predictSimple ===");
    console.log("Props:", props);

    let numerator = 0;
    let denominator = 0;

    for (const neighbor of neighbors) {
        console.log("==============================\n");
        const sim = neighbor.distance;
        console.log("Neighbor:", neighbor, "sim:", sim);

        if (sim === undefined || Number.isNaN(sim)) {
            console.log("Skipping neighbor: sim is undefined or NaN");
            continue;
        }

        // Get neighbor data
        const neighborData = !itemBased
            ? matrixInfo.getRow(neighbor.index)
            : matrixInfo.getCol(neighbor.index);

        const neighborMean = !itemBased
            ? matrixInfo.getRowMean(neighbor.index)
            : matrixInfo.getColMean(neighbor.index);

        console.log("neighborData:", neighborData);
        console.log("neighborMean:", neighborMean);

        if (!neighborData || neighborMean === undefined) {
            console.log("Skipping neighbor: data or mean undefined");
            continue;
        }

        // Get rating for the element we're predicting
        // For user-based: get the neighbor's rating in the target column
        // For item-based: get the neighbor's rating in the target row
        const rating = neighborData[elementIndex]?.value;
        console.log("elementIndex:", elementIndex, "rating:", rating);

        if (rating === undefined || rating === unknownSymbol || typeof rating !== "number") {
            console.log("Skipping rating: invalid or unknownSymbol");
            continue;
        }

        numerator += sim * rating;
        denominator += Math.abs(sim);

        console.log(`Running sum => numerator: ${numerator}, denominator: ${denominator}`);
    }

    if (denominator === 0) {
        console.log("Denominator is 0, returning undefined");
        return undefined;
    }

    // Calculate mean of the main element
    const meanMain = !itemBased
        ? matrixInfo.getRowMean(targetIndex)
        : matrixInfo.getColMean(targetIndex);
    console.log("meanMain:", meanMain);

    if (meanMain === undefined) {
        console.log("meanMain undefined, returning undefined");
        return undefined;
    }

    // console.log(`Running sum => numerator: ${numerator}, denominator: ${denominator}`);
    const result = numerator / denominator;
    console.log("Predicted value:", result);
    return result;
}
