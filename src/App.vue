<script setup lang="ts">
import { FileReader } from '@/components';
</script>

<template>
  <FileReader />
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
