import {type ItemInfo, useFileInfoStore} from "@/store/fileInfoStore";

// esta función procesa los datos del archivo para extraer el valor mínimo y máximo,
// así como las dimensiones de la matriz (número de filas y columnas).

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
    
    // Set the values in the store
    fileInfoStore.setMinItemValue(min);
    fileInfoStore.setMaxItemValue(max);
    fileInfoStore.setRows(rows);
    fileInfoStore.setCols(cols!);

    console.log("Data processed successfully:");
    console.log({ min, max, rows, cols });
}
