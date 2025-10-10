import {type FilePosition, useFileInfoStore} from "@/store/fileInfoStore";

// TODO: move this to a separate file constants/global.ts
const unknownSymbol = '-';

export function processFileData() {
    const fileInfoStore = useFileInfoStore();
    const fileData = fileInfoStore.getFileData;
    
    // Early return if no data
    if (!fileData) return;

    // Text to lines
    const lines = fileData.trim().split(/\r?\n/).filter(l => l.trim() !== "");
    
    // minValue and maxValue
    const min = parseFloat(lines[0]!);
    const max = parseFloat(lines[1]!);

    // Rows and cols
    const dataRows = lines.slice(2);
    const rows = dataRows.length;
    const cols = dataRows[0]?.trim().split(/\s+/).length;

    // Search for unknown values '-'
    const unknownValues: FilePosition[] = [];
    dataRows.forEach((line, rowIndex) => {
        const values = line.trim().split(/\s+/);
        values.forEach((val, colIndex) => {
            if (val === unknownSymbol) {
                unknownValues.push({ row: rowIndex, col: colIndex });
            }
        });
    });
    
    // Set the values in the store
    fileInfoStore.setMinItemValue(min);
    fileInfoStore.setMaxItemValue(max);
    fileInfoStore.setRows(rows);
    fileInfoStore.setCols(cols);
    fileInfoStore.setUnknownValues(unknownValues);

    console.log("Data processed successfully:");
    console.log({ min, max, rows, cols, unknownValues });
}
