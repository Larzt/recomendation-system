import {useMatrixInfoStore, useFileInfoStore} from "@/store";

// this is a example function
export function dummyFunction() {
    const useMatrixInfo = useMatrixInfoStore();
    const useFileInfo = useFileInfoStore();

    if (!useMatrixInfo.matrix) return;

    const rows = useFileInfo.getRows;
    const cols = useFileInfo.getCols;

    for (let row = 0; row < 1; row++) {
        console.log("Fila: " + row);
        for (let col = 0; col < cols; col++) {
            console.log(useMatrixInfo.getValueAt(row, col));
        }
    }
    // console.log(useMatrixInfo.setValueAt(0, 4, 999));
    // useMatrixInfo.matrix[0][4].value = 888;
    // useMatrixInfo.getMatrix[0][4].value = 888;

    useMatrixInfo.showMatrix();
}