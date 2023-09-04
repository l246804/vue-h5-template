import Vant from 'vant'
import type { UserModule } from '@/types/user-module'

export const install: UserModule = ({ app }) => {
  app.use(Vant)
}
