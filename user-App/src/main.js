import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue3 from 'bootstrap-vue-3'
import VueGoogleMaps from '@fawmi/vue-google-maps';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

import { API_KEY } from './api_key.js';
const app = createApp(App)

app.use(BootstrapVue3)
app.use(router)

app.use(VueGoogleMaps, {
  load: {
    key: API_KEY,
  },
})

app.mount('#app') 
import { createApp } from 'vue';
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue-3'


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import store from './vuex'
import './axios'



app.use(router)
app.use(store)
app.use(BootstrapVue)

app.mount('#app')
