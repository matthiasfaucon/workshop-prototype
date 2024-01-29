import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css';

// Import Leaflet JavaScript
import 'leaflet/dist/leaflet.js';

const app = createApp(App)

app.use(router)
app.use(createPinia())

app.mount('#app')
