const TOKEN_KEY = '__accessToken__'
const privateToken = useLocalStorage(TOKEN_KEY, '')

export const Token = {
  getRef: () => privateToken,
  get: () => privateToken.value,
  getRaw: () => privateToken.value.split(' ')[1] || '',
  set: (token: string) => {
    privateToken.value = [__ENV__.VITE_APP_ACCESS_TOKEN_PREFIX, token].filter(Boolean).join(' ')
  },
  clear: () => {
    privateToken.value = null
  },
}

export function tryParseUrlToken() {
  const params = new URLSearchParams(location.search)
  const token = params.get('access_token') || ''
  if (token) {
    Token.set(token)
    // 开发时可能会刷新两次，这里延迟进行处理
    if (__DEV__) {
      setTimeout(() => {
        // 移除地址栏上的参数
        history.replaceState(null, document.title, location.pathname)
      }, 500)
    }
    else {
      // 移除地址栏上的参数
      history.replaceState(null, document.title, location.pathname)
    }
  }
}
