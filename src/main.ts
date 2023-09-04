import 'normalize.css'
import 'vant/lib/index.css'
import '@/styles/vant.scss'
import '@/styles/index.scss'

import App from './App.vue'
import type { UserModule } from './types/user-module'
import { tryParseUrlToken } from '@/http/token'

const app = createApp(App)

// install all modules under `modules/`
Object.values(
  import.meta.glob<{ index?: number; install: UserModule }>('./modules/*.ts', { eager: true }),
)
  .sort((a, b) => (a.index ?? 1) - (b.index ?? 1))
  .forEach((i) => i.install?.({ app }))

app.mount('#app')

tryParseUrlToken()
