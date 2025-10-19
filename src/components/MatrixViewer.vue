<script setup lang="ts">
import { computed } from 'vue';
import { useMatrixInfoStore } from '@/store/matrixInfoStore';
const matrixStore = useMatrixInfoStore();

// IMPORTANT!
// 'computed' creates a reactive value that automatically updates
// when any of its reactive dependencies change (in those cases, 'matrix').
// Vue caches the result and only re-computes it when dependencies change.

const matrix = computed(() => matrixStore.getMatrix);
const rowMeans = computed(() => {
  if (!matrix.value.length) return [] as (number | undefined)[];
  return matrix.value.map((_, rowIndex) => matrixStore.getRowMean(rowIndex));
});
const colMeans = computed(() => {
  const m = matrix.value;
  if (!m.length) return [] as (number | undefined)[];
  const cols = m[0]?.length ?? 0;
  return Array.from({ length: cols }, (_, c) => matrixStore.getColMean(c));
});
</script>

<template>
  <div class="matrix-view">
    <table>
      <thead>
      <tr>
        <th>Fila</th>
        <th v-for="(cell, colIndex) in matrix[0]" :key="colIndex">Col {{ colIndex + 1 }}</th>
        <th>Media</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="(row, rowIndex) in matrix" :key="rowIndex">
        <td><strong>{{ rowIndex + 1 }}</strong></td>

        <td v-for="(cell, colIndex) in row" :key="colIndex">{{ cell.value }}</td>

        <td class="mean">{{ (rowMeans[rowIndex] ?? 0).toFixed(2) }}</td>
      </tr>
      </tbody>
      <tfoot>
        <tr>
          <th>Media</th>
          <td v-for="(mean, colIndex) in colMeans" :key="'mean-'+colIndex" class="mean">
            {{ (mean ?? 0).toFixed(2) }}
          </td>
          <td class="mean"></td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<style scoped lang="scss">
.matrix-view {
  padding: 1rem;

  h2 {
    margin-bottom: 1rem;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    text-align: center;
    background: #fafafa;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    overflow: hidden;

    th, td {
      padding: 0.5rem 1rem;
      border: 1px solid #ddd;
    }

    th {
      background: #eee;
      font-weight: bold;
    }

    .mean {
      background: #f0f8ff;
      font-weight: bold;
    }
  }

  .empty {
    color: #666;
    font-style: italic;
  }
}
</style>
