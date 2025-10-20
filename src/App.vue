<script setup lang="ts">
import { useMatrixInfoStore, useFileInfoStore } from '@/store'
import { FileUploader, MatrixConfig, MatrixViewer } from '@/components'
import { mainFunction } from './utils/main_function';

const useFileStore = useFileInfoStore()
const useMatrixInfo = useMatrixInfoStore()

function handleConfigSubmit(payload: {
  neighbors: number | null
  algorithm: TAlgorithm
  prediction: TPrediction
}) {
  console.log('Configuración aplicada:', payload)
  mainFunction({
    algorithm: payload.algorithm,
    maxNeighbors: payload.neighbors ?? 2,
    itemBased: payload.itemBased,
    prediction: payload.prediction,
  })
  // Here, call the main function
}
</script>

<template>
  <div class="container">
    <FileUploader />
    <MatrixConfig @submit="handleConfigSubmit" />
    <MatrixViewer v-if="useFileStore.fileData" />
  </div>
</template>


<style lang="scss">
html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: $bg-dark;
}

#app {
  min-height: 100vh;
  width: 100%;
}

.container {
  max-width: 600px;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
