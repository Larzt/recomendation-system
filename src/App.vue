<script setup lang="ts">
import { useFileInfoStore } from '@/store'
import { FileUploader, MatrixConfig, MatrixViewer } from '@/components'
import { mainFunction } from './utils/mainFunction';
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const useFileStore = useFileInfoStore()

function changeLanguage(lang: string) {
  locale.value = lang
}

function handleConfigSubmit(payload: {
  neighbors: number | null
  algorithm: TAlgorithm
  prediction: TPrediction
}) {
  mainFunction({
    algorithm: payload.algorithm,
    maxNeighbors: payload.neighbors ?? 2,
    itemBased: payload.itemBased,
    prediction: payload.prediction,
  })
}
</script>

<template>
  <div class="app-wrapper">
    <div class="language-switcher">
      <button
          :class="{ active: locale === 'es' }"
          @click="changeLanguage('es')"
      >ES</button>
      <button
          :class="{ active: locale === 'en' }"
          @click="changeLanguage('en')"
      >EN</button>
    </div>

    <div class="container">
      <FileUploader />
      <MatrixConfig @submit="handleConfigSubmit" />
      <MatrixViewer v-if="useFileStore.fileData" />
    </div>
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

.app-wrapper {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;

  .language-switcher {
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: flex;
    gap: 0.5rem;

    button {
      padding: 0.4rem 0.8rem;
      border-radius: 0.5rem;
      border: 2px solid $primary;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        transform: translateY(-1px);
        box-shadow: 0 2px 6px $shadow-light;
      }

      &.active {
        background-color: $primary;
        color: white;
        box-shadow: 0 2px 6px $shadow-hover;
      }

      &:not(.active) {
        background-color: $bg-light;
        color: $primary;
      }
    }
  }
}

.container {
  max-width: 600px;
  width: 100%;
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
