import type { CreateAxiosDefaults } from 'axios'

export function baseOptions() {
  return {
    baseURL: __ENV__.VITE_API_BASE_URL,
    timeout: __ENV__.VITE_API_TIMEOUT,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  } as CreateAxiosDefaults
}
