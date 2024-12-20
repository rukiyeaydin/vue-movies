import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import route from './router/route'

createApp(App).use(route).mount('#app')