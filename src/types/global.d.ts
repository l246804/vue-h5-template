import { ViteEnv } from '~/types/env'

declare global {
  // global variables
  const __ENV__: ViteEnv
  const __DEV__: boolean
  const __PROD__: boolean
  const __TEST__: boolean

  interface Window {
    // mount window's variables
  }
}

export {}
