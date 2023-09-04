import { bigCamelCase } from '@rhao/lodash-x'
import type { UserModule } from '@/types/user-module'

const svg = import.meta.glob<string>('@/assets/svg/*.svg', {
  eager: true,
  import: 'default',
  query: 'raw',
})

export const install: UserModule = ({ app }) => {
  Object.entries(svg).forEach(([key, value]) => {
    const component = defineComponent({
      name: bigCamelCase(
        `${key.slice(key.lastIndexOf('/') + 1, key.lastIndexOf('.svg'))}-icon`,
      ),
      render: () => h('div', { style: 'display: inline-flex;', innerHTML: value }),
    })
    app.component(component.name, component)
  })
}
