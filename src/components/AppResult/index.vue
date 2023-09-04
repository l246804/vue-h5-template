<script setup lang="ts">
import type { EmptyProps } from 'vant'

defineOptions({
  name: 'AppResult',
})

defineProps<Partial<EmptyProps> & { title?: string }>()

const slots = useSlots()
</script>

<template>
  <VanEmpty
    class="app-result"
    :image="image"
    :image-size="imageSize"
  >
    <template
      v-if="slots.image"
      #image
    >
      <slot name="image">
        <img
          :src="image"
          alt="result-image"
        >
      </slot>
    </template>

    <div class="result-container">
      <slot name="header">
        <h3 class="title">
          {{ title }}
        </h3>
      </slot>
      <slot name="description">
        <p class="description van-empty__description">
          {{ description }}
        </p>
      </slot>
    </div>
  </VanEmpty>
</template>

<style lang="scss" scoped>
.app-result {
  width: 40%;
  min-width: 100vmin;
  border-radius: 4px;
  background: var(--result-bg, #dfdfdf);

  .result-container {
    text-align: center;

    .title {
      margin: 0;
      color: var(--app-title);
      font-size: 50px;
    }

    .description {
      margin-top: 20px;
    }
  }
}

[color-schema='dark'] {
  .app-result {
    --result-bg: #303030;
  }
}
</style>
