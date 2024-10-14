import axios, { AxiosError } from 'axios'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { Navigate } from 'react-router-dom'

const baseURL = import.meta.env.VITE_BASE_URL

let cookies = parseCookies()
let isRefreshing = false
let failedRequestsQueue: any[] = []

const apiNoAuth = axios.create({
  baseURL,
})

const api = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${cookies['enem-calculator.access']}`,
  },
})

export { api, apiNoAuth }

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      const errorResponse = error.response as any

      if (errorResponse.data?.code === 'token_not_valid') {
        cookies = parseCookies()
        const { 'enem-calculator.refresh': refreshToken } = cookies
        const originalConfig = error.config

        if (!isRefreshing) {
          isRefreshing = true

          api
            .post('/token/refresh/', { refresh: refreshToken })
            .then((response) => {
              const newToken = response.data.access

              setCookie(undefined, 'enem-calculator.access', newToken, {
                maxAge: 1000 * 60 * 5,
                path: '/',
              })

              api.defaults.headers.common.Authorization = `Bearer ${newToken}`

              failedRequestsQueue.forEach((req) => req.resolve(newToken))
              failedRequestsQueue = []
            })
            .catch((err) => {
              failedRequestsQueue.forEach((req) => req.reject(err))
              failedRequestsQueue = []
            })
            .finally(() => {
              isRefreshing = false
            })
        }

        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            resolve: (token: string) => {
              if (originalConfig?.headers) {
                originalConfig.headers.Authorization = `Bearer ${token}`
                resolve(api(originalConfig))
              }
            },
            reject: (err: AxiosError) => {
              reject(err)
            },
          })
        })
      } else {
        destroyCookie(undefined, 'enem-calculator.access')
        destroyCookie(undefined, 'enem-calculator.refresh')
        if (!window.location.href.endsWith('/login')) {
          Navigate({ to: '/login' })
        }
      }
    }

    return Promise.reject(error)
  },
)
