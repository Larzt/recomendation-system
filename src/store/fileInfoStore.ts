import { defineStore } from 'pinia';
import { processFileData, generateMatrix, rowMean } from "@/utils";
import { dummyFunction } from "@/utils/metricas/pearson";
import {useMatrixInfoStore} from "@/store";
// este archivo define una tienda llamada "fileInfo" que maneja el estado relacionado con la información del archivo,
// incluyendo los datos del archivo, los valores mínimos y máximos de los ítems, y las dimensiones de la matriz (filas y columnas).
// También proporciona getters para acceder a estos estados y acciones para actualizar la información del archivo y sus propiedades relacionadas.

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
// define la tienda "fileInfo" con su estado, getters y acciones relacionadas. 
export const useFileInfoStore = defineStore('fileInfo', {
    state: (): FileInfoState => ({
        fileData: "",
        minItemValue: -1,
        maxItemValue: -1,
        rows: -1,
        cols: -1,
    }),
    // here goes everything that's in "state: () => {}"
    getters: {
        getFileData: (state) => state.fileData,
        getMinItemValue: (state) => state.minItemValue,
        getMaxItemValue: (state) => state.maxItemValue,
        getRows: (state) => state.rows,
        getCols: (state) => state.cols
    },
    // here goes everything that use parameters from "state: () => {}"
    actions: {
        setFileInfo(data: string) {
            this.fileData = data;
            processFileData();
            generateMatrix();
            dummyFunction();
            const useMatrixStore = useMatrixInfoStore();
            console.log(useMatrixStore.getRowMean(0));
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
