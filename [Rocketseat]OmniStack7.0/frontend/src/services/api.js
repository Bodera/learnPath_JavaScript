import axios from 'axios'

const api = axios.create({
    baseURL : 'http://localhost:2277'
})

export default api