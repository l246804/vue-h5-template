import { MaybeNullish } from '@rhao/types-base'

/**
 * ID 类型
 */
export type IdType = string | number

/**
 * 基础数据模型
 */
export interface BaseModel {
  id: MaybeNullish<IdType>
  createBy?: string
  createTime?: string
  updateBy?: string
  updateTime?: string
  [K: string]: unknown
}

/**
 * 分页参数
 */
export interface PageParams {
  /**
   * 页码
   */
  page: number
  /**
   * 分页大小
   */
  size: number
}

/**
 * 日期范围参数
 */
export interface TimeRangeParams {
  /**
   * 开始时间
   */
  startTime?: string
  /**
   * 结束时间
   */
  endTime?: string
}

/**
 * 日期范围配置参数
 */
export interface TimeRangeConfigParams<F = string> {
  /**
   * 时间配置
   */
  filterTime?: {
    /**
     * 时间字段
     */
    field?: F
  } & TimeRangeParams
}

/**
 * 排序参数
 */
export interface SortParams {
  /**
   * 排序字段
   */
  sortField?: string
  /**
   * 排序顺序
   */
  sortOrder?: '' | 'asc' | 'desc'
}

/**
 * 分页数据
 */
export interface PageData<T = any> {
  content: T[]
  total: number
}
