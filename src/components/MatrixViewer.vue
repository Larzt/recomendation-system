<script setup lang="ts">
import { computed } from 'vue';
import { useMatrixInfoStore } from '@/store/matrixInfoStore';

const matrixStore = useMatrixInfoStore();
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
    <table class="matrix-table">
      <thead class="matrix-header">
      <tr>
        <th class="header-empty"></th>
        <th v-for="(cell, colIndex) in matrix[0]" :key="colIndex" class="header-cell">
          Item {{ colIndex + 1 }}
        </th>
        <th class="header-mean">Mean</th>
      </tr>
      </thead>

      <tbody class="matrix-body">
      <tr v-for="(row, rowIndex) in matrix" :key="rowIndex" class="matrix-row">
        <td class="user-label">User {{ rowIndex + 1 }}</td>
        <td
            v-for="(cell, colIndex) in row"
            :key="colIndex"
            class="matrix-cell"
        >
          {{ cell.value ?? '-' }}
        </td>
        <td class="row-mean">{{ (rowMeans[rowIndex] ?? 0).toFixed(2) }}</td>
      </tr>
      </tbody>

      <tfoot class="matrix-footer">
      <tr>
        <th class="footer-label">Mean</th>
        <td
            v-for="(mean, colIndex) in colMeans"
            :key="'mean-'+colIndex"
            class="col-mean"
        >
          {{ (mean ?? 0).toFixed(2) }}
        </td>
        <td class="footer-empty"></td>
      </tr>
      </tfoot>
    </table>
  </div>
</template>

<style scoped lang="scss">
.matrix-view {
  padding: 1rem;
  background-color: $primary-lighten;
  border-radius: 16px;
  box-shadow: 0 4px 10px $shadow-light;

  .matrix-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    text-align: center;
    font-family: "Inter", sans-serif;
    font-size: 0.95rem;
    background-color: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 6px $shadow-light;

    th, td {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid $border;
    }

    .matrix-header {
      th {
        background-color: $primary-light;
        color: $primary-darken;
        font-weight: 600;
        letter-spacing: 0.5px;
      }
      .header-empty {
        background-color: $primary-lighten;
      }
      .header-mean {
        background-color: $primary-bg;
      }
    }

    .matrix-body {
      .matrix-row {
        &:nth-child(even) {
          background-color: $primary-lighten;
        }

        .user-label {
          font-weight: 600;
          background-color: $primary-light;
          color: $primary-darken;
          text-align: left;
          padding-left: 1rem;
        }

        .row-mean {
          background-color: $primary-bg;
          font-weight: 600;
          color: $primary-darken;
        }
      }
    }

    .matrix-footer {
      th, td {
        font-weight: 600;
      }

      .footer-label {
        background-color: $primary-bg;
        color: $primary-darken;
      }

      .col-mean {
        background-color: $primary-bg;
        color: $primary-darken;
      }

      .footer-empty {
        background-color: white;
      }
    }
  }
}
</style>
