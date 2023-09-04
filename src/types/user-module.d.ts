import type { App } from 'vue'
import type { Router } from 'vue-router'
import type { Fn } from '@rhao/types-base'

export type UserModule = Fn<[ctx: { app: App; }]>
