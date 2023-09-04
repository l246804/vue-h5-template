<script setup lang="ts">
defineOptions({
  name: 'SignIn',
})

const router = useRouter()
function gotoSignUp() {
  router.push({ name: 'sign-up' })
}
</script>

<template>
  <div>
    <VanNavBar
      :left-arrow="true"
      @click-left="router.backWithData({ title: 'cs' })"
    />
    <div>登录</div>
    <VanButton @click="gotoSignUp">
      注册
    </VanButton>
    <input>
  </div>
</template>

<route lang="json5">
{
  "name": "sign-in",
  "meta": {
    "title": "登录",
  },
}
</route>
