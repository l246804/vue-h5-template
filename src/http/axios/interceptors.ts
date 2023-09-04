import type { AxiosInstance } from 'axios'
import { Token } from '../token'

export function setupRequestInterceptors(instance: AxiosInstance) {
  instance.interceptors.request.use(
    (config) => {
      if (!config.headers?.Authorization) config.headers.Authorization = Token.get()
      return config
    },
  )
}
