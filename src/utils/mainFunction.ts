import {useMatrixInfoStore} from '@/store';
import {unknownSymbol} from '@/constants';
import {distanceCalculator, predictionSelector } from "@/utils";

interface Props {
    algorithm: TAlgorithm;
    maxNeighbors: number;
    itemBased: boolean;
    prediction: TPrediction;
}

export function mainFunction(props: Props): void {
    const matrixInfo = useMatrixInfoStore();
    const maxIterations = 1000;
    let iteration = 0;

    while (iteration < maxIterations) {
        iteration++;

        let foundUnknown = false;
        let unknownRow = -1;
        let unknownCol = -1;
        
        outerLoop: for (let row = 0; row < matrixInfo.matrix.length; row++) {
            const rowData = matrixInfo.matrix[row];
            if (!rowData) continue;
            
            for (let col = 0; col < rowData.length; col++) {
                if (rowData[col]?.value === unknownSymbol) {
                    unknownRow = row;
                    unknownCol = col;
                    foundUnknown = true;
                    break outerLoop;
                }
            }
        }
        
        if (!foundUnknown) {
            console.log(`Todas las celdas desconocidas han sido predichas. Total de iteraciones: ${iteration - 1}`);
            break;
        }

        console.log(`\n--- Iteración ${iteration}: Prediciendo celda [${unknownRow}, ${unknownCol}] ---`);
        
        let result: IProcessResult | null = null;
        
        if (props.itemBased) {
            const totalCols = matrixInfo.getCol(0)?.length ?? 0;
            const distances = distanceCalculator(unknownCol, totalCols, props.algorithm, true);
            result = { targetIndex: unknownCol, elementIndex: unknownRow, distances };
        } else {
            const totalRows = matrixInfo.matrix.length;
            const distances = distanceCalculator(unknownRow, totalRows, props.algorithm, false);
            result = { targetIndex: unknownRow, elementIndex: unknownCol, distances };
        }
        
        if (!result) {
            console.warn(` No se pudo calcular predicción para [${unknownRow}, ${unknownCol}]`);
            matrixInfo.setPosition(unknownRow, unknownCol, 0);
            continue;
        }
        
        result.distances.sort((a, b) => b.distance - a.distance)
        let predictValue = predictionSelector({
            prediction: props.prediction,
            targetIndex: result.targetIndex,
            elementIndex: result.elementIndex,
            neighbors: result.distances,
            maxNeighbors: props.maxNeighbors,
            itemBased: props.itemBased
        });

        if (predictValue !== undefined) {
            predictValue = Math.round((predictValue + Number.EPSILON) * 100) / 100;
            console.log(`Valor predicho para [${unknownRow}, ${unknownCol}]: ${predictValue}`);

            matrixInfo.setPosition(unknownRow, unknownCol, predictValue);
        } else {
            console.warn(`Predicción undefined para [${unknownRow}, ${unknownCol}], usando 0`);
            matrixInfo.setPosition(unknownRow, unknownCol, 0);
        }
    }
    
    if (iteration >= maxIterations) {
        console.error(`Se alcanzó el máximo de iteraciones (${maxIterations}). Puede haber un problema.`);
    }
    
    console.log("\n=== Matriz final después de todas las predicciones ===");
    matrixInfo.showMatrix();
}
