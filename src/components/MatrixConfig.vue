<script setup lang="ts">
import { ref } from 'vue'
import { metricErrors, neighborsErrors, predictionErrors } from '@/constants'

// Variables locales
const neighbors = ref<number | null>(null)
const selectedAlgorithm = ref('')
const selectedPrediction = ref('')
const errorMessage = ref('')

function handleNeighbors(event: Event) {
  const input = event.target as HTMLInputElement
  neighbors.value = Number(input.value)
}

function selectMetric(metric: string) {
  selectedAlgorithm.value = metric
}

function handleOptionChange(event: Event) {
  const select = event.target as HTMLSelectElement
  selectedPrediction.value = select.value
}

const emit = defineEmits(['submit'])

function handleSubmit() {
  errorMessage.value = ''

  if (!neighbors.value || neighbors.value <= 0) {
    errorMessage.value = neighborsErrors
    return
  }

  if (!selectedAlgorithm.value) {
    errorMessage.value = metricErrors
    return
  }

  if (!selectedPrediction.value) {
    errorMessage.value = predictionErrors
    return
  }

  // Emitir los valores al componente padre
  emit('submit', {
    neighbors: neighbors.value,
    algorithm: selectedAlgorithm.value,
    prediction: selectedPrediction.value,
  })
}
</script>

<template>
  <form class="info-form" @submit.prevent="handleSubmit">
    <!-- Input de vecinos -->
    <input
        type="number"
        min="1"
        placeholder="Número de vecinos"
        @change="handleNeighbors"
    />

    <!-- Botones de métricas -->
    <div class="button-group">
      <button
          v-for="metric in ['Pearson', 'Coseno', 'Euclidean']"
          :key="metric"
          type="button"
          class="metric-btn"
          :class="{ active: selectedAlgorithm === metric }"
          @click="selectMetric(metric)"
      >
        {{ metric }}
      </button>
    </div>

    <!-- Selector -->
    <div class="form-group">
      <label for="opciones">Selecciona una opción</label>
      <select id="opciones" @change="handleOptionChange">
        <option value="">-- Selecciona --</option>
        <option value="simple">Simple</option>
        <option value="difference">Diferencia con la media</option>
      </select>
    </div>

    <!-- Mensaje de error -->
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

    <!-- Botón de envío -->
    <button type="submit" class="submit-btn">Aplicar configuración</button>
  </form>
</template>

<style scoped lang="scss">
.info-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.error-message {
  color: red;
  font-weight: 600;
  text-align: center;
  margin-top: -0.5rem;
}

input[type='number'] {
  padding: 0.6rem 0.8rem;
  border: 1px solid $border;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
  &:focus {
    border-color: $primary;
    box-shadow: 0 0 0 3px rgba($primary, 0.15);
    outline: none;
  }
}

.button-group {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.metric-btn {
  flex: 1;
  min-width: 120px;
  padding: 0.8rem 1rem;
  border: 2px solid $border;
  border-radius: 0.6rem;
  background-color: $bg-light;
  color: $primary;
  font-weight: 600;
  cursor: pointer;
  transition: 0.25s;

  &:hover {
    background-color: $primary;
    color: white;
    border-color: $primary;
    transform: translateY(-2px);
  }

  &.active {
    background-color: $primary;
    color: white;
    border-color: $primary;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  label {
    font-weight: 600;
    color: $primary;
  }

  select {
    padding: 0.6rem 0.8rem;
    border: 1px solid $border;
    border-radius: 0.5rem;
    font-size: 1rem;
    transition: border-color 0.2s, box-shadow 0.2s;
    &:focus {
      border-color: $primary;
      box-shadow: 0 0 0 3px rgba($primary, 0.15);
      outline: none;
    }
  }
}

.submit-btn {
  align-self: center;
  padding: 0.8rem 1.6rem;
  background-color: $primary;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 0.6rem;
  cursor: pointer;
  transition: background-color 0.25s, transform 0.15s, box-shadow 0.2s;

  &:hover {
    background-color: darken($primary, 7%);
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba($primary, 0.2);
  }

  &:active {
    transform: scale(0.98);
  }
}
</style>
