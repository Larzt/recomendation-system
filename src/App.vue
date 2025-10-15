<script setup lang="ts">
import { FileReader, MatrixViewer } from '@/components';
import {useFileInfoStore} from "@/store";

const useFileStore = useFileInfoStore();

</script>

<template>
  <FileReader />
  <MatrixViewer v-if="useFileStore.fileData" />
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
</style>
