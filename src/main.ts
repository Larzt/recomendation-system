import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import PhosphorIcons from "@phosphor-icons/vue"

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(PhosphorIcons)
app.mount('#app')
