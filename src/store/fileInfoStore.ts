import { defineStore } from 'pinia';
import { processFileData } from "@/utils";

export type FilePosition = {
    row: number;
    col: number;
};

interface FileInfoState {
    fileData: string;
    minItemValue: number;
    maxItemValue: number;
    rows: number;
    cols: number;
    unknownValues: FilePosition[];
}

export const useFileInfoStore = defineStore('fileInfo', {
    state: (): FileInfoState => ({
        fileData: "",
        minItemValue: -1,
        maxItemValue: -1,
        rows: -1,
        cols: -1,
        unknownValues: [],
    }),
    getters: {
        getFileData: (state) => state.fileData,
        getMinItemValue: (state) => state.minItemValue,
        getMaxItemValue: (state) => state.maxItemValue,
        getRows: (state) => state.rows,
        getCols: (state) => state.cols,
        getUnknownValues: (state) => state.unknownValues,
    },
    actions: {
        setFileInfo(data: string) {
            this.fileData = data;
            processFileData();
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
        setUnknownValues(values: FilePosition[]) {
            this.unknownValues = values;
        },
    },
});
