import { TabbarItemProps } from 'vant'
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    /**
     * 排序索引
     */
    index?: number
    /**
     * 标题
     */
    title?: string
    /**
     * 是否为 Tabbar 页面
     */
    tabbar?: boolean
    /**
     * Tabbar 配置
     */
    tabbarProps?: Pick<TabbarItemProps, 'badge' | 'badgeProps' | 'dot' | 'icon'>
  }
}

export {}
