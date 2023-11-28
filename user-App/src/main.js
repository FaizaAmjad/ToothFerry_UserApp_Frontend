import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue-3'


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import store from './vuex'
import './axios'

import { API_KEY } from './api_key.js';
const app = createApp(App)

app.use(BootstrapVue3)
app.use(router)

app.mount('#app')