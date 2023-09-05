export interface ViteEnv {
  /**
   * 应用基路径
   */
  VITE_APP_BASE_URL: string
  /**
   * 应用接口基路径
   */
  VITE_API_BASE_URL: string
  /**
   * 应用接口基路径
   */
  VITE_API_TIMEOUT: number
  /**
   * 应用中文标题
   */
  VITE_APP_TITLE: string
  /**
   * 应用英文标题
   */
  VITE_APP_EN_TITLE: string
  /**
   * 应用中文描述
   */
  VITE_APP_DESC: string
  /**
   * 应用英文描述
   */
  VITE_APP_EN_DESC: string
  /**
   * 浏览器页签图标
   */
  VITE_APP_ICON: string
  /**
   * 地址栏应用访问令牌参数名
   */
  VITE_APP_ACCESS_TOKEN_KEY: string
  /**
   * 应用访问令牌
   */
  VITE_APP_ACCESS_TOKEN: string
  /**
   * 应用访问令牌前缀
   */
  VITE_APP_ACCESS_TOKEN_PREFIX: string

  /**
   * 是否启用 `@vitejs/plugin-legacy`，使用传统浏览器时需启用
   */
  VITE_PLUGIN_LEGACY: boolean

  /**
   * `px-to-viewport` 插件配置
   */
  VITE_PX_TO_VIEWPORT_CONFIG: {
    unit: string
    precision: number
    designWidth: number
  }
}
