import { defineStore } from "pinia"
import type { ItemInfo } from "@/store/fileInfoStore"
import { rowMean, colMean } from '@/utils'

export const useMatrixInfoStore = defineStore('matrixInfo', {
    state: () => ({
        matrix: [] as ItemInfo[][],
    }),

    getters: {
        getMatrix: (state) => state.matrix,
        getValueAt: (state) => (row: number, col: number) => {
            return state.matrix?.[row]?.[col]?.value
        },
    },

    actions: {
        showMatrix() {
            if (!this.matrix.length) {
                console.log("⚠️ La matriz está vacía.")
                return
            }
            const table = this.matrix.map(row => row.map(cell => cell.value))
            console.table(table)
        },

        setMatrix(matrix: ItemInfo[][]) {
            this.matrix = matrix
        },

        getRowMean(rowIndex: number) {
            return rowMean(this.matrix as ItemInfo[][], rowIndex)
        },

        getColMean(colIndex: number) {
            return colMean(this.matrix as ItemInfo[][], colIndex)
        },
    },
})
