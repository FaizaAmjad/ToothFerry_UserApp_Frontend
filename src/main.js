import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue-3'
import VueGoogleMaps from '@fawmi/vue-google-maps'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

import store from './vuex'

import { API_KEY } from './api_key.js'

const app = createApp(App)

app.use(router)
app.use(BootstrapVue)
app.use(store)

app.use(VueGoogleMaps, {
  load: {
    key: API_KEY
  }
})

const selectedTheme = localStorage.getItem('selectedTheme')
if (selectedTheme) {
  document.documentElement.classList.add(selectedTheme)
}

app.mount('#app')