import { combineURLs } from '@rhao/lodash-x'
import { http } from '@/http/axios'

// 微服务模块
export type ServiceModule = ''

export abstract class BaseService {
  /**
   * 基础 URL
   */
  protected baseURL: string
  /**
   * 微服务模块名
   */
  protected module: ServiceModule
  /**
   * 服务控制器名
   */
  protected controller: string

  constructor(
    controller: string,
    module: ServiceModule = '',
    baseURL = http.defaults.baseURL!,
  ) {
    this.baseURL = baseURL
    this.module = module
    this.controller = controller
  }

  /**
   * 构建完整 URL
   * @param endpoint 端点名
   * @returns 完整 URL
   */
  protected buildURL(endpoint = '') {
    const url = [this.module, this.controller, endpoint].reduce(
      (url, point) => combineURLs(point, url),
      this.baseURL,
    )
    return url
  }
}
