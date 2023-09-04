<script setup lang="ts">
import { pxToViewport } from '@rhao/web-utils'
import AppResult from '@/components/AppResult'
import AlertIcon from '@/assets/svg/alert.svg'

defineOptions({
  name: 'AppMobileDetector',
})

const isMobile = __DEV__ || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  navigator.userAgent,
)
</script>

<template>
  <slot v-if="isMobile" />
  <div
    v-else
    class="alert-container"
  >
    <AppResult
      title="警告"
      description="请使用移动设备访问"
      :image="AlertIcon"
      :image-size="pxToViewport(100)"
    />
  </div>
</template>

<style lang="scss" scoped>
.alert-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
