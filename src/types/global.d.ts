declare global {
    type TAlgorithm = 'euclidean' | 'pearson' | 'cosine';
    type TPrediction = 'difference' | 'simple';
    type TNeighbor = { index: number; distance: number };

    interface IItemInfo {
        value: string | number;
        row: number;
        col: number;
    }

    interface IProcessResult {
        targetIndex: number;
        elementIndex: number;
        distances: Array<TNeighbor>;
    }
}

export {}