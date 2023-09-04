<script setup lang="ts">
import { pxToViewport } from '@rhao/web-utils'

defineOptions({
  name: 'AppSideMenu',
})

const props = defineProps<{
  show: boolean
}>()

const emits = defineEmits<{
  'update:show': [boolean]
}>()

const innerShow = computed({
  get: () => props.show,
  set: (value) => {
    emits('update:show', value)
  },
})

const profileStore = useProfileStore()
const profile = computed(() => profileStore.profile)

function handleClose() {
  innerShow.value = false
}
</script>

<template>
  <VanPopup
    v-model:show="innerShow"
    position="left"
    teleport="body"
    :close-on-popstate="true"
    :safe-area-inset-top="true"
    :safe-area-inset-bottom="true"
    :style="{ width: '100%', height: '100%' }"
  >
    <div class="menu-container">
      <VanCell
        class="profile-cell"
        :title="profile.username"
        :label="profile.email"
        :center="true"
      >
        <VanImage
          round
          :width="pxToViewport(150)"
          :height="pxToViewport(150)"
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        />
      </VanCell>
      <div class="menu-list">
        <VanCell
          title="登录"
          :clickable="true"
          :border="false"
          :center="true"
          icon="photo"
          :to="{ name: 'sign-in' }"
        />
        <VanCell
          title="注册"
          :clickable="true"
          :border="false"
          :center="true"
          icon="photo"
          :to="{ name: 'sign-up' }"
        />
        <VanCell
          title="设置"
          :clickable="true"
          :border="false"
          :center="true"
          icon="setting"
          :to="{ name: 'setting' }"
        />
      </div>
      <div class="split-line van-hairline--top" />
      <div class="menu-list">
        <VanCell
          title="关闭"
          :clickable="true"
          icon="clear"
          @click="handleClose"
        />
      </div>
    </div>
  </VanPopup>
</template>

<style lang="scss" scoped>
.menu-container {
  .profile-cell {
    --van-cell-text-color: #fff;
    --van-cell-label-color: #efefef;
    --van-cell-font-size: 40px;
    --van-cell-label-font-size: 30px;

    padding: 50px 40px;
    background: url('@/assets/images/material.jpg') no-repeat center;
    background-size: cover;
  }

  .menu-list {
    margin-top: 20px;
  }

  .split-line {
    height: 1px;
    margin: 20px 0;
  }
}
</style>
