import {euclideanDistance} from "@/utils/metrics/euclidean";
import {pearsonCorrelation} from "@/utils/metrics/pearson";
import {cosineSimilarity} from "@/utils/metrics/coseno";

export function algorithmSelector(algorithm: TAlgorithm, Row1: number, Row2: number, Item: boolean = false): number | undefined  {
    switch (algorithm) {
        case 'euclidean':
            return euclideanDistance(Row1, Row2, Item);
        case 'pearson':
            return pearsonCorrelation(Row1, Row2, Item);
        case 'cosine':
            return cosineSimilarity(Row1, Row2, Item);
        default:
            return undefined;
    }
}