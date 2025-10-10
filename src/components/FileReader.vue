<script setup lang="ts">
import { ref } from 'vue'
import { useFileInfoStore } from '@/store'
import { PhFileArrowUp, PhFileText } from '@phosphor-icons/vue'

const useFileInfo = useFileInfoStore()
const fileInput = ref<HTMLInputElement | null>(null)

function handleFileUpload(event: Event) {
  const input = event.target as HTMLInputElement
  const fileData = input.files?.[0]
  if (!fileData) return

  const reader = new FileReader()

  reader.onload = (e) => {
    const content = e.target?.result as string
    console.log('File content:\n', content)
    useFileInfo.setFileInfo(content)
  }

  reader.onerror = () => {
    console.error('Error reading file')
  }

  reader.readAsText(fileData)
}

function triggerFileDialog() {
  fileInput.value?.click()
}
</script>

<template>
  <div class="container">
    <div class="upload-box" @click="triggerFileDialog">
      <PhFileArrowUp size="36" weight="duotone" color="#2563eb" /> <!-- $primary-->
      <label>Haz clic aquí o arrastra un archivo</label>
      <input
          ref="fileInput"
          id="fileInput"
          type="file"
          accept=".txt"
          @change="handleFileUpload"
      />
    </div>

    <div v-if="useFileInfo.fileData != ''" class="info-card">
      <div class="card-header">
        <PhFileText size="28" weight="duotone" color="$primary" />
        <h2>Información del archivo</h2>
      </div>
      <div class="info-grid">
        <p><strong>Min Item Value:</strong> {{ useFileInfo.getMinItemValue }}</p>
        <p><strong>Max Item Value:</strong> {{ useFileInfo.getMaxItemValue }}</p>
        <p><strong>Rows:</strong> {{ useFileInfo.getRows }}</p>
        <p><strong>Cols:</strong> {{ useFileInfo.getCols }}</p>
      </div>

      <details class="file-content">
        <summary>Ver contenido del archivo</summary>
        <pre>{{ useFileInfo.getFileData }}</pre>
      </details>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* ====== Contenedor principal ====== */
.container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  color: $text;
}

/* ====== Caja de subida ====== */
.upload-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid $border;
  border-radius: 1rem;
  padding: 2rem;
  background-color: $bg-light;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s, transform 0.15s;
}

.upload-box:hover {
  background-color: $bg-light;
  border-color: $primary;
  transform: scale(1.01);
}

.upload-box label {
  font-size: 1rem;
  font-weight: 600;
  margin-top: 0.8rem;
  color: $primary;
  pointer-events: none; /* evita que el label intercepte el click */
}

/* ocultamos el input real */
.upload-box input[type="file"] {
  display: none;
}

/* ====== Tarjeta de información ====== */
.info-card {
  background: $bg-light;
  border-radius: 1rem;
  margin-top: 2rem;
  padding: 1.5rem;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1rem;
}

.card-header h2 {
  font-size: 1.2rem;
  font-weight: 700;
  color: $text;
}

.info-grid {
  display: grid;
  grid-template-columns: .4fr .4fr;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.file-content summary {
  cursor: pointer;
  color: $primary;
  font-weight: 600;
}

.file-content pre {
  background: $content;
  border-radius: .8rem;
  padding: 1rem;
  overflow-x: auto;
  font-size: 1rem;
  line-height: 1.4;
  max-height: 300px;
  overflow-y: auto;
}
</style>
