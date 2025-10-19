import { type ItemInfo, useFileInfoStore, useMatrixInfoStore } from "@/store";
import {unknownSymbol} from "@/constants";

// esta función genera una matriz de IItemInfo a partir de los datos del archivo
// y la almacena en la tienda de información de la matriz.

export function generateMatrix() {
    const useMatrixInfo = useMatrixInfoStore();
    const useFileInfo = useFileInfoStore();
    const fileData = useFileInfo.getFileData;

    if (!fileData) return;

    const lines = fileData.trim().split(/\r?\n/);
    const dataLines = lines.slice(2);

    const matrix: ItemInfo[][] = dataLines.map((line, rowIndex) => {
        const values = line.trim().split(/\s+/);
        return values.map((val, colIndex) => {
            const value = val === unknownSymbol ? unknownSymbol : Number(val);
            const item: ItemInfo = {
                value,
                row: rowIndex,
                col: colIndex,
            };
            return item;
        });
    });

    useMatrixInfo.setMatrix(matrix);
}
