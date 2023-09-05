import type { PxToViewportOptions } from '@rhao/web-utils'
import { getFullURL, pxToViewport } from '@rhao/web-utils'
import { assign } from 'lodash-es'
import type { UserModule } from '@/types/user-module'

export const install: UserModule = () => {
  getFullURL.defaultBase = __ENV__.VITE_APP_BASE_URL
  assign(pxToViewport.defaults, __ENV__.VITE_PX_TO_VIEWPORT_CONFIG as PxToViewportOptions)
}
