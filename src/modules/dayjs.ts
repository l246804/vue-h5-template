import 'dayjs/locale/zh-cn'

import dayjs from 'dayjs'
import type { UserModule } from '@/types/user-module'

export const install: UserModule = () => {
  dayjs.locale('zh-cn')
}
