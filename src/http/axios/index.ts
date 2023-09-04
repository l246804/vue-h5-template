import axios from 'axios'
import { baseOptions } from './options'
import { setupRequestInterceptors } from './interceptors'

const http = axios.create(baseOptions())

setupRequestInterceptors(http)

export { http }
