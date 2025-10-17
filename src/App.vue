<script setup lang="ts">
import { useFileInfoStore } from '@/store'
import { useMatrixInfoStore } from '@/store'
import FileUploader from '@/components/FileUploader.vue'
import MatrixConfig from '@/components/MatrixConfig.vue'
import MatrixViewer from '@/components/MatrixViewer.vue'

const useFileStore = useFileInfoStore()
const useMatrixInfo = useMatrixInfoStore()

// Manejador del evento que viene del Config
function handleConfigSubmit(payload: {
  neighbors: number | null
  algorithm: string
  prediction: string
}) {
  console.log('⚙️ Configuración aplicada:', payload)

  // Here, call the main function
}
</script>

<template>
  <div class="container">
    <FileUploader />

    <!-- Escucha el evento emitido -->
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
