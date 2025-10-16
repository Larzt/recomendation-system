import type { ItemInfo } from '@/store/fileInfoStore';

const unknownSymbol = '-';


export function colMean(matrix: ItemInfo[][], colIndex: number): number | undefined {
    if (!matrix || matrix.length === 0) return undefined;

    let sum = 0;
    let count = 0;

    for (let r = 0; r < matrix.length; r++) {
        const val = matrix[r]?.[colIndex]?.value; // Accede al valor en la columna específica de la fila r. En caso de que no exista, val será undefined.
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

export default colMean;

