import type { ItemInfo } from "@/store/fileInfoStore";
import { useMatrixInfoStore } from "@/store";
import { unknownSymbol } from "@/constants";

interface PredictSimpleProps {
    targetIndex: number;
    neighbors: Array<{ index: number; distance: number }>;
    itemBased: boolean;
}


/**
 * Predicts simple.
 */
export function predictSimple(props: PredictSimpleProps): number | undefined {
    const matrixInfo = useMatrixInfoStore();
    const { targetIndex, neighbors, itemBased } = props;
    console.log("=== predictDifferenceWithMean ===");
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

        // Get rating for target
        const rating = neighborData[targetIndex]?.value;
        console.log("targetIndex:", targetIndex, "rating:", rating);

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
