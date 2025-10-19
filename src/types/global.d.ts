declare global {
    type TAlgorithm = 'euclidean' | 'pearson' | 'cosine';
    type TPrediction = 'meanDifference' | 'simple';

    interface IItemInfo {
        value: string | number;
        row: number;
        col: number;
    }
}

export {}