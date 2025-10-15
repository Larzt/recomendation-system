import type { ItemInfo } from '@/store/fileInfoStore';

const unknownSymbol = '-';

/**
 * Calcula la media de la fila `rowIndex` para una matriz de `ItemInfo[][]`.
 * Ignora valores '-' y valores no numéricos.
 */
export function rowMean(matrix: ItemInfo[][], rowIndex: number): number | undefined {
    if (!matrix || matrix.length === 0) return undefined;
    const row = matrix[rowIndex];
    if (!row) return undefined;

    let sum = 0;
    let count = 0;

    for (let c = 0; c < row.length; c++) {
        const val = row[c]?.value;
        if (val === undefined) continue;
        if (val === unknownSymbol) continue;
        if (typeof val === 'number' && !Number.isNaN(val)) {
            sum += val;
            count++;
        }
    }

    if (count === 0) return undefined;
    return sum / count;
}

export default rowMean;
