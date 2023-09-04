import { createAppSDK } from 'vue-app-sdk'
import { createAnimationPlugin } from 'vue-app-sdk/plugins/animation'
import { createKeepAlivePlugin } from 'vue-app-sdk/plugins/keepAlive'
import type { UserModule } from '@/types/user-module'

const sdk = createAppSDK()
sdk.use(createAnimationPlugin()).use(createKeepAlivePlugin())

export const install: UserModule = ({ app }) => {
  app.use(sdk)
}
