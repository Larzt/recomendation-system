#  Sistema de Recomendación

Sistema de recomendación colaborativo basado en filtrado que implementa múltiples algoritmos de similitud y métodos de predicción. Desarrollado con Vue 3, TypeScript y Vite.

##  Resumen del Proyecto

Este sistema implementa **filtrado colaborativo** para predecir valoraciones desconocidas en matrices usuario-ítem. Permite cargar archivos con datos, configurar diferentes algoritmos (Euclidiana, Pearson, Coseno) y métodos de predicción (Simple, Diferencia con media), y visualizar los resultados en una interfaz interactiva. El sistema procesa automáticamente todas las celdas desconocidas de forma iterativa hasta completar la matriz.

## 👥 Participantes

- **Víctor Rodríguez Dorta** - alu0101540153
- **Alejandro Rodríguez Mederos** - alu0101413938
- **Mario Guerra Pérez** - alu0101395036

## �📋 Tabla de Contenidos

- [Resumen del Proyecto](#-resumen-del-proyecto)
- [Participantes](#-participantes)
- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Cómo Iniciar el Programa](#-cómo-iniciar-el-programa)
- [Uso](#-uso)
- [Algoritmos Implementados](#-algoritmos-implementados)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Formato de Archivo](#-formato-de-archivo)
- [Ejemplos](#-ejemplos)
- [Scripts Disponibles](#-scripts-disponibles)
- [Contribuir](#-contribuir)

## 🛠 Tecnologías

- **Vue 3** - Framework progresivo de JavaScript
- **TypeScript** - Superset tipado de JavaScript
- **Vite** - Build tool de nueva generación
- **Pinia** - Gestión de estado para Vue
- **Vue I18n** - Internacionalización
- **SCSS** - Preprocesador CSS
- **Phosphor Icons** - Biblioteca de iconos

## 📦 Requisitos Previos

- **Bun** `>=1.0.0` (Runtime y gestor de paquetes JavaScript)

### 🔧 Cómo Instalar Bun

**Windows (PowerShell):**
```powershell
powershell -c "irm bun.sh/install.ps1 | iex"
```

**Linux/macOS:**
```bash
curl -fsSL https://bun.sh/install | bash
```

**Verificar la instalación:**
```bash
bun --version
```

Para más información sobre la instalación de Bun, visita: https://bun.sh/docs/installation

## 🚀 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/Larzt/recomendation-system.git
cd recomendation-system
```

2. Instala las dependencias con Bun:
```bash
bun install
```

## 🎮 Cómo Iniciar el Programa

### Modo Desarrollo

Inicia el servidor de desarrollo con hot-reload:

```bash
bun dev
```

El servidor se iniciará automáticamente en `http://localhost:5173` (o el siguiente puerto disponible).

### Modo Producción

Para compilar y ejecutar en modo producción:

```bash
# Compilar para producción
bun run build

# Previsualizar la build de producción
bun run preview
```

## 📖 Uso

### 1. Cargar Archivo

- Haz clic en el área de carga o arrastra un archivo `.txt`
- El archivo debe seguir el [formato especificado](#formato-de-archivo)

### 2. Configurar Parámetros

- **Número de vecinos**: Cantidad de vecinos a considerar en la predicción
- **Algoritmo de similitud**: Euclidean, Pearson o Cosine
- **Tipo de predicción**: Simple o Diferencia con la media
- **Modo**: Basado en Usuarios o en Ítems

### 3. Ejecutar

- Haz clic en "Aplicar configuración"
- El sistema procesará automáticamente todas las celdas desconocidas (`-`)
- Visualiza la matriz resultante con las predicciones

## 🧮 Algoritmos Implementados

### Métricas de Similitud

#### 1. Distancia Euclidiana
Calcula la similitud basada en la distancia geométrica entre vectores normalizados por la media.

```typescript
sim(u,v) = Σ((r(u,i) - μ_u) * (r(v,i) - μ_v)) / √(Σ(r(u,i) - μ_u)² * Σ(r(v,i) - μ_v)²)
```

#### 2. Correlación de Pearson
Mide la correlación lineal entre dos usuarios o ítems.

```typescript
pearson(u,v) = Σ((r(u,i) - μ_u) * (r(v,i) - μ_v)) / √(Σ(r(u,i) - μ_u)² * Σ(r(v,i) - μ_v)²)
```

#### 3. Similitud del Coseno
Calcula el coseno del ángulo entre vectores de valoraciones.

```typescript
cos(u,v) = Σ(r(u,i) * r(v,i)) / √(Σr(u,i)² * Σr(v,i)²)
```

### Métodos de Predicción

#### 1. Predicción Simple
```typescript
r̂(u,i) = Σ(sim(u,v) * r(v,i)) / Σ|sim(u,v)|
```

#### 2. Predicción con Diferencia de Media
```typescript
r̂(u,i) = μ_u + Σ(sim(u,v) * (r(v,i) - μ_v)) / Σ|sim(u,v)|
```

## 📁 Estructura del Proyecto

```
recomendation-system/
├── public/                    # Archivos de ejemplo
│   ├── example.txt
│   ├── esports.txt
│   └── restaurante.txt
├── src/
│   ├── components/           # Componentes Vue
│   │   ├── FileUploader.vue
│   │   ├── MatrixConfig.vue
│   │   └── MatrixViewer.vue
│   ├── constants/            # Constantes globales
│   │   ├── errors.ts
│   │   └── global.ts
│   ├── locales/              # Traducciones i18n
│   │   ├── en.json
│   │   └── es.json
│   ├── store/                # Gestión de estado (Pinia)
│   │   ├── fileInfoStore.ts
│   │   └── matrixInfoStore.ts
│   ├── styles/               # Estilos globales
│   │   ├── base.scss
│   │   ├── colors.scss
│   │   └── global.scss
│   ├── utils/                # Utilidades y lógica
│   │   ├── metrics/          # Algoritmos de similitud
│   │   │   ├── euclidean.ts
│   │   │   ├── pearson.ts
│   │   │   └── coseno.ts
│   │   ├── predictions/      # Métodos de predicción
│   │   │   ├── simple.ts
│   │   │   ├── predictDifferenceWithMean.ts
│   │   │   └── getNeighborRating.ts
│   │   ├── mainFunction.ts
│   │   ├── matrixBuilder.ts
│   │   └── distanceCalculator.ts
│   ├── App.vue
│   └── main.ts
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 📄 Formato de Archivo

El archivo de entrada debe tener el siguiente formato:

```
[valor_mínimo]
[valor_máximo]
[valoración_1,1] [valoración_1,2] ... [valoración_1,n]
[valoración_2,1] [valoración_2,2] ... [valoración_2,n]
...
[valoración_m,1] [valoración_m,2] ... [valoración_m,n]
```

- **Línea 1**: Valor mínimo de las valoraciones (ej: `1.0`)
- **Línea 2**: Valor máximo de las valoraciones (ej: `6.0`)
- **Líneas 3+**: Matriz de valoraciones (usuarios × ítems)
- **Valores desconocidos**: Usa `-` para indicar valores a predecir
- **Separador**: Espacios o tabulaciones

### Ejemplo:

```txt
1.0
6.0
5.0 3.2 4.6 4.1 -
3.1 1.1 2.4 3.2 3.3
4.2 3.2 4.6 3.7 5.4
3.2 3.7 1.7 5.1 4.6
1.3 5.0 5.0 2.0 1.1
```

## 🎓 Ejemplos

El proyecto incluye tres archivos de ejemplo en la carpeta `public/`:

1. **example.txt** - Ejemplo básico de matriz 5×5
2. **esports.txt** - Dataset de videojuegos y usuarios
3. **restaurante.txt** - Dataset de restaurantes y comensales

## 🧪 Scripts Disponibles

```bash
# Desarrollo
bun dev

# Compilar para producción
bun run build

# Previsualizar build
bun run preview

# Verificación de tipos
bun run type-check

# Linting
bun run lint

# Formateo de código
bun run format
```

## 📝 Notas Técnicas

- **Gestión de Estado**: Utiliza Pinia con dos stores principales:
  - `fileInfoStore`: Maneja la información del archivo y metadatos
  - `matrixInfoStore`: Gestiona la matriz de valoraciones y cálculos

- **Procesamiento Iterativo**: El algoritmo procesa las celdas desconocidas de forma iterativa, con un máximo de 1000 iteraciones para evitar bucles infinitos

- **Cálculo de Medias**: Las medias por fila y columna se calculan dinámicamente, excluyendo valores desconocidos

- **Validación**: Formulario con validación completa de parámetros antes de ejecutar predicciones


Link del Proyecto: [https://github.com/Larzt/recomendation-system](https://github.com/Larzt/recomendation-system)

**Proyecto académico** - Gestión del Conocimiento en las Organizaciones (GCO)

