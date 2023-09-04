import type { TabbarItemProps } from 'vant'
import type { RouteRecordNormalized } from 'vue-router'

export interface TabbarItem extends TabbarItemProps {
  title: string
}

export const useTabbarStore = defineStore('tabbar', () => {
  const router = useRouter()

  const active = ref<string>('')
  const activeItem = computed(() => findByPath(active.value))
  const items = shallowRef<TabbarItem[]>([])

  function initItems(force = false) {
    if (items.value.length > 0 && !force) return

    const routes = router.getRoutes()
    items.value = routes
      .filter((route) => route.meta.tabbar)
      .sort((a, b) => a.meta.index! - b.meta.index!)
      .map(convertByRoute)
  }

  function findByPath(path: string) {
    return items.value.find((item) => item.name === path)
  }

  function convertByRoute(route: RouteRecordNormalized) {
    return {
      ...(route.meta.tabbarProps || {}),
      title: route.meta.title,
      name: route.path,
      replace: true,
      to: route.path,
    } as TabbarItem
  }

  return {
    active,
    activeItem,
    items,
    initItems,
    findByPath,
    convertByRoute,
  }
})
