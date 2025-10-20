import { useFileInfoStore, useMatrixInfoStore } from "@/store";
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

    console.log("=== DEBUG generateMatrix ===");
    console.log("Total lines:", lines.length);
    console.log("Data lines count:", dataLines.length);
    console.log("Data lines:", dataLines);

    const matrix: IItemInfo[][] = dataLines.map((line, rowIndex) => {
        const values = line.trim().split(/\s+/);
        console.log(`Row ${rowIndex}:`, values);
        return values.map((val, colIndex) => {
            const value = val === unknownSymbol ? unknownSymbol : Number(val);
            const item: IItemInfo = {
                value,
                row: rowIndex,
                col: colIndex,
            };
            return item;
        });
    });

    console.log("Generated matrix rows:", matrix.length);
    console.log("Matrix:", matrix);
    useMatrixInfo.setMatrix(matrix);
}
