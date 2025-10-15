import {defineStore} from "pinia";
import type {ItemInfo} from "@/store/fileInfoStore";
import { rowMean } from '@/utils';

export const useMatrixInfoStore = defineStore('matrixInfo', {
    state: () => ({
        matrix: [],
    }),
    // here goes everything that's in "state: () => {}"
    getters: {
        getMatrix: (state) => state.matrix,
        getValueAt: (state) => (row: number, col: number) => {
            return state.matrix?.[row]?.[col]?.value;
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
    },
})