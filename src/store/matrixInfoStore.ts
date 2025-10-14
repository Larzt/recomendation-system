import {defineStore} from "pinia";
import type {ItemInfo} from "@/store/fileInfoStore.ts";

export const useMatrixInfoStore = defineStore('matrixInfo', {
    state: () => ({
        matrix: [],
    }),
    getters: {
        getMatrix: (state) => state.matrix,
        getValueAt: (state) => (row: number, col: number) => {
            return state.matrix?.[row]?.[col]?.value;
        },
    },
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
        setValueAt(row: number, col: number, newValue: string | number){
            if (this.matrix?.[row]?.[col]) {
                this.matrix[row][col].value = newValue;
            }
        }
    },
})