import { useFileInfoStore } from "@/store/fileInfoStore";

export function generateDataFromFile() {
    const fileInfoStore = useFileInfoStore();
    const fileData = fileInfoStore.getFileData;

    if (!fileData) return;
    const lines = fileData.trim().split(/\r?\n/);

    const min = parseFloat(lines[0]!);
    const max = parseFloat(lines[1]!);

    const dataRows = lines.slice(2);
    const rows = dataRows.length;
    const cols = dataRows[0]?.trim().split(/\s+/).length;

    fileInfoStore.setMinItemValue(min);
    fileInfoStore.setMaxItemValue(max);
    fileInfoStore.setRows(rows);
    fileInfoStore.setCols(cols!);
    console.log("Data processed successfully:");
}
