<script lang="ts" setup>
import { addUnit, createBEM, cssVar } from '@rhao/web-utils'
import type { IconProps } from './types'

defineOptions({
  name: 'AppIcon',
})

const props = withDefaults(defineProps<IconProps>(), {
  color: 'inherit',
  size: '1em',
  prefix: 'van-icon',
})

const emits = defineEmits<{
  click: [MouseEvent]
}>()

const ns = createBEM('app-icon')

const style = computed(() => {
  const { size, color, angle } = props
  return {
    fontSize: size == null ? undefined : addUnit(size),
    transform: !angle ? undefined : `rotateZ(${addUnit(angle, 'deg')})`,
    ...cssVar({ color: color }, 'icon'),
  }
})

const fontIconCls = computed(() => {
  const { name, prefix } = props
  return name ? [prefix, `${prefix}-${name}`] : []
})

function handleClick(e) {
  emits('click', e)
}
</script>

<template>
  <i
    :class="[
      ns.b(),
      ns.is('font', !!name),
      ...fontIconCls,
    ]"
    :style="style"
    @click="handleClick"
  >
    <template v-if="!name">
      <!--
        @slot 默认插槽，用于内嵌 `SVG` 图标
       -->
      <slot />
    </template>
  </i>
</template>

<style lang="scss" scoped>
.app-icon {
  display: inline-flex;
  position: relative;
  align-items: center;
  justify-content: center;
  width: 1em;
  height: 1em;
  fill: currentcolor;
  color: var(--icon-color, inherit);
  font-size: inherit;
  line-height: 1em;
  text-align: center;
  vertical-align: middle;

  :deep(svg) {
    width: 1em;
    height: 1em;
  }
}
</style>
