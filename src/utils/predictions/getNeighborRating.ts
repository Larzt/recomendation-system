/**
 * Obtiene el rating válido de un vecino para un elemento específico.
 * @param {Object} neighbor - El vecino a evaluar (debe tener .index).
 * @param {number} elementIndex - El índice del elemento que queremos predecir.
 * @param {Object} matrixInfo - Objeto que contiene getRow, getCol, getRowMean, getColMean.
 * @param {boolean} itemBased - Si es true, usamos item-based; si no, user-based.
 * @param {*} unknownSymbol - Valor que representa rating desconocido.
 * @returns {number|null} - Retorna el rating válido o null si no es válido.
 */
export function getNeighborRating(neighbor, elementIndex, matrixInfo, itemBased, unknownSymbol) {
    const neighborData = !itemBased
        ? matrixInfo.getRow(neighbor.index)
        : matrixInfo.getCol(neighbor.index);

    const neighborMean = !itemBased
        ? matrixInfo.getRowMean(neighbor.index)
        : matrixInfo.getColMean(neighbor.index);

    console.log("neighborData:", neighborData);
    console.log("neighborMean:", neighborMean);

    if (!neighborData || neighborMean === undefined) {
        console.log("Skipping neighbor: data or mean undefined");
        return null;
    }

    const rating = neighborData[elementIndex]?.value;
    console.log("elementIndex:", elementIndex, "rating:", rating);

    if (rating === undefined || rating === unknownSymbol || typeof rating !== "number") {
        console.log("Skipping rating: invalid or unknownSymbol");
        return null;
    }

    return rating;
}
