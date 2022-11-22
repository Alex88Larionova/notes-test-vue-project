import { createApp } from 'vue'
import App from './App.vue'
import { i18n } from './localization/i18n.js'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(router)
app.use(i18n)

app.mount('#app')

