import { combineURLs } from '@rhao/lodash-x'

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

  constructor(controller: string, module: ServiceModule = '', baseURL = '') {
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
    return [this.module, this.controller, endpoint].reduce(combineURLs, this.baseURL)
  }
}
