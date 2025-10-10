<script setup lang="ts">
import { useFileInfoStore } from '@/store'

const useFileInfo = useFileInfoStore();

function handleFileUpload(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]

  if (!file) return

  const reader = new FileReader()

  reader.onload = (e) => {
    const content = e.target?.result as string
    console.log('Contenido del archivo:', content)
    useFileInfo.setFileInfo(content);
  }

  reader.onerror = () => {
    console.error('Error al leer el archivo')
  }

  reader.readAsText(file)
}
</script>

<template>
  <div class="upload-file">
    <label for="fileInput">Subir archivo de texto:</label>
    <input
      id="fileInput"
      type="file"
      accept=".txt"
      @change="handleFileUpload"
    />
  </div>
  <div v-if='useFileInfo.file != ""'>
    {{ useFileInfo.file }}
  </div>
</template>

<style scoped>
.upload-file {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 1rem 0;
}
</style>
