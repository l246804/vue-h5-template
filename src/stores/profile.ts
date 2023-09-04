export const useProfileStore = defineStore('profile', () => {
  const profile = reactive({
    username: '用户名称',
    email: '电子邮箱',
  })

  return {
    profile,
  }
})
