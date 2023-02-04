import axios from 'axios'

const baseURL = import.meta.env.VITE_BASE_URL

const apiNoAuth = axios.create({
  baseURL,
})

const api = axios.create({
  baseURL,
})

export { api, apiNoAuth }
