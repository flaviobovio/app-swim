import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import router from './router.js'
import Vue3Toastify, { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css'

const app = createApp(App)

app.use(router)
app.use(Vue3Toastify, {
  autoClose: 1500,
  position: 'bottom-right',
})

app.mount('#app')
