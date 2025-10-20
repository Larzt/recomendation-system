import { useFileInfoStore, useMatrixInfoStore } from "@/store";
import { unknownSymbol } from "@/constants";

export function matrixBuilder() {
    const useMatrixInfo = useMatrixInfoStore();
    const useFileInfo = useFileInfoStore();
    const fileData = useFileInfo.getFileData;

    if (!fileData) return;
    const lines = fileData.trim().split(/\r?\n/);
    const dataLines = lines.slice(2);
    const matrix: IItemInfo[][] = dataLines.map((line, rowIndex) => {
        const values = line.trim().split(/\s+/);
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

    useMatrixInfo.setMatrix(matrix);
}
