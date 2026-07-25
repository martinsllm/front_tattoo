import axios from 'axios'

export const authTokenStorageKey = 'front_tattoo_auth_token'

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: 'application/json',
  },
})

http.interceptors.request.use((config) => {
  const token = localStorage.getItem(authTokenStorageKey)

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})
