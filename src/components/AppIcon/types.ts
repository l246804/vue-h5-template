export interface IconProps {
  /**
   * 图标大小
   * @type {string | number}
   * @default '1em'
   */
  size?: string | number
  /**
   * 图标颜色
   * @default 'inherit'
   */
  color?: string
  /**
   * 旋转角度
   */
  angle?: string | number
  /**
   * 字体图标名，设置后将忽略内嵌 `SVG` 图标
   */
  name?: string
  /**
   * 字体前缀
   * @default 'van'
   */
  prefix?: string
}
