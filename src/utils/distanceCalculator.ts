import {algorithmSelector} from "@/utils/algorithmSelector";

export function distanceCalculator(baseIndex: number, totalCount: number, algorithm: TAlgorithm, isItemBased: boolean ): Array<TNeighbor> {
    const distances: Array<TNeighbor> = [];

    for (let i = 0; i < totalCount; i++) {
        if (i === baseIndex) continue;
        const distance = algorithmSelector(algorithm, baseIndex, i, isItemBased) as number;
        distances.push({index: i, distance});
    }
    return distances;
}