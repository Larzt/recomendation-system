# 🎯 Sistema de Recomendación

Sistema de recomendación colaborativo basado en filtrado que implementa múltiples algoritmos de similitud y métodos de predicción. Desarrollado con Vue 3, TypeScript y Vite.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Algoritmos Implementados](#-algoritmos-implementados)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Formato de Archivo](#-formato-de-archivo)
- [Ejemplos](#-ejemplos)
- [Contribuir](#-contribuir)

## ✨ Características

- **Filtrado Colaborativo**: Implementa filtrado basado en usuarios e ítems
- **Múltiples Métricas de Similitud**:
  - Distancia Euclidiana
  - Correlación de Pearson
  - Similitud del Coseno
- **Métodos de Predicción**:
  - Predicción Simple
  - Predicción con Diferencia de Media
- **Interfaz Interactiva**: Visualización de matriz en tiempo real con medias por fila y columna
- **Multiidioma**: Soporte para español e inglés
- **Procesamiento Iterativo**: Predicción automática de todos los valores desconocidos

## 🛠 Tecnologías

- **Vue 3** - Framework progresivo de JavaScript
- **TypeScript** - Superset tipado de JavaScript
- **Vite** - Build tool de nueva generación
- **Pinia** - Gestión de estado para Vue
- **Vue I18n** - Internacionalización
- **SCSS** - Preprocesador CSS
- **Phosphor Icons** - Biblioteca de iconos

## 📦 Requisitos Previos

- Node.js `^20.19.0` o `>=22.12.0`
- Bun `>=1.0.0` ([Instalar Bun](https://bun.sh))

## 🚀 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/Larzt/recomendation-system.git
cd recomendation-system
```

2. Instala las dependencias:
```bash
bun install
```

3. Inicia el servidor de desarrollo:
```bash
bun dev
```

4. Abre tu navegador en `http://localhost:5173`

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

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Notas Técnicas

- **Gestión de Estado**: Utiliza Pinia con dos stores principales:
  - `fileInfoStore`: Maneja la información del archivo y metadatos
  - `matrixInfoStore`: Gestiona la matriz de valoraciones y cálculos

- **Procesamiento Iterativo**: El algoritmo procesa las celdas desconocidas de forma iterativa, con un máximo de 1000 iteraciones para evitar bucles infinitos

- **Cálculo de Medias**: Las medias por fila y columna se calculan dinámicamente, excluyendo valores desconocidos

- **Validación**: Formulario con validación completa de parámetros antes de ejecutar predicciones

## 📧 Contacto

Mario Guerra Pérez - [@Larzt](https://github.com/Larzt)

Link del Proyecto: [https://github.com/Larzt/recomendation-system](https://github.com/Larzt/recomendation-system)

---

⭐ Si este proyecto te ha sido útil, considera darle una estrella en GitHub

