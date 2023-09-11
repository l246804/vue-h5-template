import type { BasicRequestHook, RequestFetcher, RequestOptions, RequestResult } from '@rhao/request'
import { createRequestHook } from '@rhao/request'
import { isEqual } from 'lodash-es'
import type { AxiosError, AxiosResponse } from 'axios'
import { RequestThrottle } from '@rhao/request-basic-middleware/throttle'
import { RequestDebounce } from '@rhao/request-basic-middleware/debounce'
import { RequestRefresh } from '@rhao/request-basic-middleware/refresh'
import { RequestRefreshToken } from '@rhao/request-basic-middleware/refresh-token'
import { RequestSWR } from '@rhao/request-basic-middleware/swr'
import { RequestAxios } from '@rhao/request-middleware-axios'
import { RequestVue } from '@rhao/request-middleware-vue'
import {
  getErrorMessage,
  normalizeResponseData,
  normalizeResponseDataByBlob,
  validAxiosResponse,
} from './utils'

type FlattenAxiosResponse<T> = T extends AxiosResponse<infer D> ? D : T

export interface UseRequest extends BasicRequestHook {
  <TData, TParams extends unknown[] = unknown[]>(
    fetcher: RequestFetcher<TData, TParams>,
    options?: RequestOptions<FlattenAxiosResponse<TData>, TParams>,
  ): RequestResult<FlattenAxiosResponse<TData>, TParams>
}

export const useRequest = createRequestHook({
  // 设置数据对比器
  dataComparer: isEqual,

  // 解析后端数据
  async dataParser(data) {
    // 如果不是调用 axios 的响应直接返回
    if (!validAxiosResponse(data)) return data

    const axiosResponse: AxiosResponse = data
    // 状态码非 200 直接抛出错误
    if (axiosResponse.status !== 200) throw new Error(getErrorMessage(axiosResponse))

    // 处理文件流响应
    const respData
      = axiosResponse.config.responseType === 'blob'
        ? await normalizeResponseDataByBlob(axiosResponse.data)
        : normalizeResponseData(axiosResponse.data)

    // 如果后端的数据格式设置了 error 则抛出错误
    if (respData.error) throw new Error(respData.message)

    return respData.data
  },

  // 默认不立即执行
  immediate: false,

  middleware: [
    RequestVue(),

    RequestAxios(),

    RequestDebounce(),

    RequestThrottle(),

    RequestRefresh(),

    RequestRefreshToken({
      expired: (err) => {
        const error = err as AxiosError
        return [401, 403].includes(error.status!)
      },
      handler: () => {
        // TODO: 刷新 token
        return Promise.resolve()
      },
      // TODO: 有刷新 token 功能时移除下行代码
      allow: () => false,
    }),

    RequestSWR({
      // 默认保鲜时间 10 分钟
      staleTime: 60e3 * 5,
    }),
  ],
}) as UseRequest
