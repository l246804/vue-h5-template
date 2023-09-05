import { resolve } from 'node:path'
import { defineConfig, splitVendorChunkPlugin } from 'vite'
import { createToolkit } from '@rhao/vite-toolkit'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import Pages from 'vite-plugin-pages'
import AutoImport from 'unplugin-auto-import/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import Legacy from '@vitejs/plugin-legacy'
import Autoprefixer from 'autoprefixer'
import Px2Vw from 'postcss-px-to-viewport-8-plugin'
import type { ViteEnv } from './types/env'

// https://vitejs.dev/config/
export default defineConfig((configEnv) => {
  const toolkit = createToolkit<ViteEnv>(configEnv)
  const env = toolkit.loadEnv()

  return {
    base: env.VITE_APP_BASE_URL,

    server: {
      host: true,
      hmr: true,
      proxy: {
        // 本地接口代理
        '^/api/local': {
          rewrite: (path) => path.replace(/^\/api\/local\//, '/api'),
          target: '',
          changeOrigin: true,
        },
        '^/api': {
          target: '',
          changeOrigin: true,
        },
      },
    },

    plugins: [
      // https://github.com/vitejs/vite-plugin-vue
      Vue({
        script: {
          defineModel: true,
        },
      }),
      VueJsx(),

      env.VITE_PLUGIN_LEGACY
        // https://github.com/vitejs/vite/tree/main/packages/plugin-legacy
        && Legacy({
          targets: ['chrome >= 51', 'android >= 7', 'ios >= 10', 'not ie 11'],
        }),

      // https://github.com/hannoeru/vite-plugin-pages
      Pages({
        exclude: ['**/hooks/**/*', '**/utils/**/*', '**/constants/**/*', '**/components/**/*'],
        extensions: ['vue'],
      }),

      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          '@vueuse/head',
          '@vueuse/core',
          'pinia',
          {
            '@/http/request': ['useRequest'],
            'vue-app-sdk': ['useAppSDK', 'useRouteDetails'],
          },
        ],
        dts: 'src/types/auto-imports.d.ts',
        dirs: ['src/stores', 'src/hooks'],
        vueTemplate: true,
        resolvers: [VantResolver({ importStyle: false })],
      }),

      // https://cn.vitejs.dev/guide/build.html#chunking-strategy
      splitVendorChunkPlugin(),
    ],

    define: {
      __ENV__: env,
      __DEV__: toolkit.isDev(),
      __PROD__: toolkit.isProd(),
      __TEST__: toolkit.isTest(),
    },

    esbuild: {
      // 生产环境移除 console 和 debugger
      drop: toolkit.isProd() ? ['console', 'debugger'] : [],
    },

    resolve: {
      alias: {
        '@/': `${resolve(__dirname, 'src')}/`,
        '~/': `${resolve(__dirname)}/`,
      },
    },

    css: {
      postcss: {
        plugins: [
          Autoprefixer(),
          Px2Vw({
            propList: ['*'],
            unitToConvert: 'px',
            minPixelValue: 1,
            mediaQuery: true,
            viewportWidth: (file) =>
              /node_modules[\\/]vant[\\/]/.test(file)
                ? 375
                : env.VITE_PX_TO_VIEWPORT_CONFIG.designWidth,
            unitPrecision: env.VITE_PX_TO_VIEWPORT_CONFIG.precision,
            viewportUnit: env.VITE_PX_TO_VIEWPORT_CONFIG.unit,
            fontViewportUnit: env.VITE_PX_TO_VIEWPORT_CONFIG.unit,
            exclude: [/node_modules[\\/]vite-plugin-*/],
          }),
        ],
      },
    },
  }
})
