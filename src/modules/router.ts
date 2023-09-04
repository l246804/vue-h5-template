import { router } from '@/router'
import type { UserModule } from '@/types/user-module'

export const index = 0

export const install: UserModule = ({ app }) => {
  app.use(router)
}
