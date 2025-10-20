import {predictDifferenceWithMean} from "@/utils/predictions/predictDifferenceWithMean";
import {predictSimple} from "@/utils/predictions/simple";

type PredictionSelectorProps = {
    prediction: "difference" | "simple";
    targetIndex: number;
    elementIndex: number;
    neighbors: Array<TNeighbor>;
    maxNeighbors: number;
    itemBased: boolean;
};
export function predictionSelector(props: PredictionSelectorProps): number | undefined {
    const {prediction, targetIndex, elementIndex, neighbors, maxNeighbors, itemBased} = props;
    const clamped = neighbors.slice(0, maxNeighbors);

    switch (prediction) {
        case 'difference':
            return predictDifferenceWithMean({targetIndex, elementIndex, neighbors: clamped, itemBased});
        case 'simple':
            return predictSimple({targetIndex, elementIndex, neighbors: clamped, itemBased});
        default:
            return undefined;
    }
}