import type { ItemInfo } from '@/store/fileInfoStore';
import { useMatrixInfoStore } from '@/store';
import { unknownSymbol } from '@/constants';

import { euclideanDistance } from './metricas/euclidea';

type AlgorithmType = 'euclidea' | 'pearson' | 'coseno';
type PredictionType = 'diferencia_media' | 'simple';

interface Props {
  Algorithm: AlgorithmType;
  Neighbors: number;
  ItemBased: boolean;
  Prediction: PredictionType;
}

// funcion principal que realiza switch entre algoritmos de recomendacion
export function mainFunction(props: Props) {
  const matrixInfo = useMatrixInfoStore();
  if (props.ItemBased) { // en caso de recorrido en columnas
    // recorrer las columnas
    matrixInfo.getRow(0)?.forEach((element, colIndex) => {
      // calcular la similitud entre columnas
      console.log(`Calculando similitud entre columna ${element.value} y columna ${colIndex}`);
      // matrixInfo.getCol(colIndex)?.forEach((_, rowIndex) => {
      // });
    });

  }
  
}