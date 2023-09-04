<script setup lang="ts">
defineOptions({
  name: 'Home',
})

defineProps<{
  backwardParams?: { title?: string }
}>()

const details = useRouteDetails<{ title: string }>()

const router = useRouter()
function gotoSignIn() {
  router.push({ name: 'sign-in' })
}
</script>

<template>
  <div>
    首页
    <input>
    <VanButton @click="gotoSignIn">
      登录
    </VanButton>

    {{ details.data?.title }}
  </div>
</template>

<route lang="json5">
{
  "name": "home",
  "meta": {
    "tabbar": true,
    "title": "首页",
    "index": 0,
  },
}
</route>
