<script setup lang="ts">
import { ref, computed } from 'vue'
import { useFileInfoStore } from '@/store'
import { PhFileArrowUp, PhCheckSquareOffset } from '@phosphor-icons/vue'

const useFileInfo = useFileInfoStore()

const fileInput = ref<HTMLInputElement | null>(null)

function triggerFileDialog() {
  fileInput.value?.click()
}

function handleFileUpload(event: Event) {
  const input = event.target as HTMLInputElement
  const fileData = input.files?.[0]
  if (!fileData) return

  const reader = new FileReader()
  reader.onload = (e) => {
    const content = e.target?.result as string
    useFileInfo.setFileInfo(content)
  }
  reader.readAsText(fileData)
}

const uploadText = computed(() =>
    useFileInfo.fileData
        ? 'File uploaded successfully.'
        : 'Click here or drag a .txt file'
)
</script>

<template>
  <div
      class="upload-box"
      :class="{ 'is-loaded': useFileInfo.fileData }"
      @click="triggerFileDialog"
  >
    <transition name="fade" mode="out-in">
      <PhFileArrowUp
          v-if="!useFileInfo.fileData"
          key="upload"
          size="42"
          weight="duotone"
          color="#2563eb"
      />
      <PhCheckSquareOffset
          v-else
          key="check"
          size="42"
          weight="duotone"
          color="#16a34a"
      />
    </transition>

    <p class="upload-text">{{ uploadText }}</p>

    <input
        ref="fileInput"
        id="fileInput"
        type="file"
        accept=".txt"
        @change="handleFileUpload"
    />
  </div>
</template>

<style scoped lang="scss">
.upload-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: 2px dashed $border;
  border-radius: 1rem;
  padding: 2.5rem 2rem;
  background-color: $bg-light;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(black, 0.05);

  &:hover {
    background-color: $primary-lighten;
    border-color: $primary;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba($primary, 0.1);
  }

  &.is-loaded {
    border-color: #16a34a;
    background-color: rgba(#16a34a, 0.05);
  }

  .upload-text {
    font-size: 1rem;
    font-weight: 600;
    margin-top: 0.8rem;
    color: $primary;
    transition: color 0.3s;
  }

  &.is-loaded .upload-text {
    color: #16a34a;
  }

  input[type='file'] {
    display: none;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
