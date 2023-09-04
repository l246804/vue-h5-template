<script setup lang="ts">
defineOptions({
  name: 'SignUp',
})

const router = useRouter()
</script>

<template>
  <VanNavBar
    :left-arrow="true"
    @click-left="router.back()"
  >
    注册
  </VanNavBar>
</template>

<route lang="json5">
{
  "name": "sign-up",
  "meta": {
    "title": "注册",
  },
}
</route>
