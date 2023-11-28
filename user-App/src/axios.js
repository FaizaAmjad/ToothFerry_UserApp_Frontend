import axios from 'axios'

axios.defaults.baseURL = '';
axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('token');