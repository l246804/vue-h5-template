import { readFileSync } from 'node:fs'
import { safeJSONParse } from '@rhao/lodash-x'

const pkg = safeJSONParse(readFileSync('./package.json', { encoding: 'utf-8' }), {})
const { dependencies = {} } = pkg

/**
 * @type {import('@rhao/plop-generators').AppGeneratorManifest}
 */
export default {
  scripts: {
    dev: 'vite',
    build: 'vite build',
    preview: 'vite preview',
    plop: 'plop',
    'type-check': 'vue-tsc --noEmit',
  },
  removeFiles: [
    '.git',
    '.husky',
    '.czrc',
    '.eslintrc.cjs',
    '.prettierrc',
    '.release-it.json',
    '.stylelintrc.cjs',
    'app-manifest.mjs',
    'changelog.config.cjs',
    'commitlint.config.cjs',
    'cz.config.cjs',
    'LICENSE',
    'pnpm-lock.yaml',
    'CHANGELOG.md',
  ],
  dependencies: Object.keys(dependencies),
  devDependencies: [
    '@rhao/types-base',
    '@rhao/vite-toolkit',
    '@types/lodash-es',
    '@types/node',
    '@vitejs/plugin-legacy',
    '@vitejs/plugin-vue',
    '@vitejs/plugin-vue-jsx',
    'autoprefixer',
    'postcss',
    'postcss-px-to-viewport-8-plugin',
    'sass',
    'typescript',
    'unplugin-auto-import',
    'unplugin-vue-components',
    'vite',
    'vite-plugin-pages',
    'vue-tsc',
  ],
}
