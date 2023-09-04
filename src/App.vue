<script setup lang="ts">
import AppMobileDetector from '@/components/AppMobileDetector'

useHead({
  title: __ENV__.VITE_APP_TITLE,
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: __ENV__.VITE_APP_ICON },
  ],
  meta: [
    { name: 'description', content: __ENV__.VITE_APP_DESC },
  ],
})

const { theme } = useSetting()
const { name: transitionName } = useAppSDK().animation
const { caches: keepAliveCaches } = useAppSDK().keepAlive
</script>

<template>
  <VanConfigProvider
    class="app-container"
    :theme="theme"
  >
    <AppMobileDetector>
      <RouterView v-slot="{ Component: routerComp, route }">
        <Transition
          :name="transitionName"
          :appear="true"
          :css="!!transitionName"
        >
          <KeepAlive :include="keepAliveCaches">
            <Component
              :is="routerComp"
              :key="route.fullPath"
            />
          </KeepAlive>
        </Transition>
      </RouterView>
    </AppMobileDetector>
  </VanConfigProvider>
</template>

<style lang="scss" scoped>
.app-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .forward-enter-active,
  .forward-leave-active,
  .backward-enter-active,
  .backward-leave-active {
    position: absolute;
    width: 100%;
    height: 100%;
    transition: transform 0.25s ease-out;
    background: var(--app-page-bg);
    pointer-events: none;
    will-change: transform;
  }

  .forward-enter-active,
  .backward-leave-active {
    z-index: 100;
  }

  .forward-leave-active,
  .backward-enter-active {
    z-index: 1;
  }

  .forward-leave-to,
  .backward-enter-to {
    transform: none;
  }

  .forward-enter-from,
  .backward-leave-to {
    transform: translateX(100%);
  }
}
</style>
