import type { ConfigProviderTheme } from 'vant'

/**
 * 应用配置
 */
export function useSetting() {
  const isDark = useDark({
    attribute: 'color-schema',
  })
  const theme = computed<ConfigProviderTheme>(() => isDark.value ? 'dark' : 'light')
  const toggleDark = useToggle(isDark)

  return {
    isDark,
    theme,
    toggleDark,
  }
}
