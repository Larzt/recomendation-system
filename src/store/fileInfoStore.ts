import { defineStore } from 'pinia';
import { processFileData, generateMatrix, rowMean } from "@/utils";
import { dummyFunction } from "@/utils/metricas/pearson";

export type ItemInfo = {
    value: string | number;
    row: number;
    col: number;
};

interface FileInfoState {
    fileData: string;
    minItemValue: number;
    maxItemValue: number;
    rows: number;
    cols: number;
}

export const useFileInfoStore = defineStore('fileInfo', {
    state: (): FileInfoState => ({
        fileData: "",
        minItemValue: -1,
        maxItemValue: -1,
        rows: -1,
        cols: -1,
    }),
    getters: {
        getFileData: (state) => state.fileData,
        getMinItemValue: (state) => state.minItemValue,
        getMaxItemValue: (state) => state.maxItemValue,
        getRows: (state) => state.rows,
        getCols: (state) => state.cols
    },
    actions: {
        setFileInfo(data: string) {
            this.fileData = data;
            processFileData();
            generateMatrix();
            dummyFunction();
            const useMatrixStore = useMatrixStore();
            console.log(useMatrixStore.getRowMean);
        },
        setMinItemValue(min: number) {
            this.minItemValue = min;
        },
        setMaxItemValue(max: number) {
            this.maxItemValue = max;
        },
        setRows(rows: number) {
            this.rows = rows;
        },
        setCols(cols: number) {
            this.cols = cols;
        },
    },
});
