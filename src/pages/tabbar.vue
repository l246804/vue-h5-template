<script setup lang="ts">
import { pxToViewport } from '@rhao/web-utils'
import AppIcon from '@/components/AppIcon'
import AppSideMenu from '@/components/AppSideMenu'

defineOptions({
  name: 'Tabbar',
})

const { caches: keepAliveCaches } = useAppSDK().keepAlive
const { disable: disableAnimation } = useAppSDK().animation

const tabbarStore = useTabbarStore()
tabbarStore.initItems()

const route = useRoute()
watch(
  () => route.path,
  (path) => {
    if (!tabbarStore.findByPath(path)) return
    tabbarStore.active = path
  },
  { immediate: true },
)

const { isDark, toggleDark } = useSetting()
const [showSideMenu, toggleShowSideMenu] = useToggle(false)
</script>

<template>
  <div class="tabbar-container">
    <VanNavBar
      :safe-area-inset-top="true"
      :fixed="true"
      :placeholder="true"
    >
      <template #left>
        <AppIcon
          name="wap-nav"
          :size="pxToViewport(40)"
          @click="toggleShowSideMenu()"
        />
        <AppSideMenu v-model:show="showSideMenu" />
      </template>

      <template #right>
        <AppIcon
          :size="pxToViewport(40)"
          @click="toggleDark()"
        >
          <MoonIcon v-if="isDark" />
          <SunIcon v-else />
        </AppIcon>
      </template>
    </VanNavBar>

    <RouterView v-slot="{ Component: routerComp }">
      <KeepAlive :include="keepAliveCaches">
        <Component :is="routerComp" />
      </KeepAlive>
    </RouterView>

    <VanTabbar
      v-if="tabbarStore.items.length > 0"
      v-model="tabbarStore.active"
      :safe-area-inset-bottom="true"
      :fixed="true"
      :placeholder="true"
      :route="true"
      @change="disableAnimation()"
    >
      <VanTabbarItem
        v-for="({ title, ...item }, index) in tabbarStore.items"
        :key="`tabbar-item-${index}`"
        v-bind="item"
      >
        {{ title }}
      </VanTabbarItem>
    </VanTabbar>
  </div>
</template>
