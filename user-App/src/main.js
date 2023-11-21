
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue-3'

const app = createApp(App)

app.use(router)
app.use(BootstrapVue)

app.mount('#app')
