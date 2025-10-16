import {defineStore} from "pinia";
import type {ItemInfo} from "@/store/fileInfoStore";
import { rowMean } from '@/utils';
import { colMean } from '@/utils';
export const useMatrixInfoStore = defineStore('matrixInfo', { // nombre de la matriz
    state: () => ({
        matrix: [] as ItemInfo[][],
    }),
    // here goes everything that's in "state: () => {}"
    getters: {
        getMatrix: (state) => state.matrix,
        getValueAt: (state) => (row: number, col: number) => {
            return state.matrix?.[row]?.[col]?.value;
        },
        getRow: (state) => (row: number) => {
            return state.matrix?.[row];
        },
        getCol: (state) => (col: number) => {
            return state.matrix?.map(row => row[col]);
        },
    },
    // here goes everything that use parameters from "state: () => {}"
    actions: {
        showMatrix() {
            if (!this.matrix.length) {
                console.log("⚠️ La matriz está vacía.");
                return;
            }

            const table = this.matrix.map(row => row.map(cell => cell.value));
            console.table(table);
        },
        setMatrix(matrix: ItemInfo[][])  {
            this.matrix = matrix;
        },
        // Calcula la media de una fila (usuario) a partir de this.matrix.
        getRowMean(rowIndex: number) {
            return rowMean(this.matrix as ItemInfo[][], rowIndex);
        },
        getColMean(colIndex: number) {
            return colMean(this.matrix as ItemInfo[][], colIndex);
        }
    },
})
// esto lo que hace es crear una tienda llamada "matrixInfo" que tiene un estado 
// con una matriz de ItemInfo, getters para obtener la matriz y valores específicos, 
// y acciones para mostrar la matriz, establecerla y calcular medias de filas y columnas.