import { isSafeInteger, isString } from 'lodash-es'
import { castError } from '@rhao/lodash-x'

export function validAxiosResponse(data) {
  return ['config', 'data', 'headers', 'status', 'statusText'].every(
    (key) => typeof data?.[key] !== 'undefined',
  )
}

export function getErrorMessage(error: any) {
  const getMsg = (data) => (isString(data) || isSafeInteger(data) ? data : '')

  const UNKNOWN_ERROR = '未知错误'
  if (!error) return UNKNOWN_ERROR

  const response = error?.response || error

  // 依次获取错误信息
  return (getMsg(response)
    || getMsg(response?.data?.message)
    || getMsg(response?.data?.msg)
    || getMsg(response?.data?.model)
    || getMsg(response?.data?.data)
    || getMsg(response?.data)
    || getMsg(response?.message)
    || getMsg(response?.msg)
    || getMsg(error?.message)
    || getMsg(response?.statusText)
    || getMsg(response?.status)
    || UNKNOWN_ERROR) as string
}

interface NormalizedResponseData {
  error: boolean
  data: any
  message: string
}

export async function normalizeResponseDataByBlob(data) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise<NormalizedResponseData>(async (resolve) => {
    let result = normalizeResponseData({ success: true, data })

    if (!(data instanceof Blob)) {
      result.error = true
      result.message = '文件类型错误！'
    }
    else if (['json', 'html'].some((type) => data.type.includes(type))) {
      // 解析文件内容是否是错误响应
      const decoder = new TextDecoder('utf-8')
      try {
        const buffer = await data.arrayBuffer()
        const decodedText = decoder.decode(new Uint8Array(buffer))
        const parsedData = JSON.parse(decodedText)
        result = normalizeResponseData(parsedData)
      }
      catch (e: unknown) {
        result.error = true
        result.message = castError(e).message
      }
    }
    resolve(result)
  })
}

/**
 * 处理响应数据，适配多种接口格式
 */
export function normalizeResponseData(responseData) {
  responseData ||= {}

  let error = false
  // 处理 success 格式
  if (responseData.success != null) error = !responseData.success
  // 处理 error 格式
  else if (responseData.error != null) error = responseData.error
  // 处理 ok 格式
  else if (responseData.ok != null) error = !responseData.ok

  // 依次获取不同格式的数据
  const data = responseData.data ?? responseData.model ?? responseData.dataList ?? null
  // 获取错误信息
  const message = getErrorMessage(responseData)

  return { error, data, message } as NormalizedResponseData
}
