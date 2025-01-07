<template>
  <h1 class="title">
    I am index page
  </h1>
  <button @click="themeStroe.setTheme('system')">跟随系统</button>
  <button @click="themeStroe.setTheme('dark')">暗色</button>
  <button @click="themeStroe.setTheme('light')"> 亮色</button>
</template>

<script lang="ts" setup>
import { useThemeStroe } from '@/store'
import type { ThemeType } from '@/store/theme'

const themeStroe = useThemeStroe()

onMounted(() => {
  themeStroe.setTheme((window.localStorage.getItem('theme') as ThemeType) || 'light')
})

useHead({
  script: [
    {
      // @ts-ignore
      body: true,
      children: `
      const theme = window.localStorage.getItem('theme') || 'light';
      if (theme === 'system') {
        const themeMedia = window.matchMedia('(prefers-color-scheme: dark)')
        if (themeMedia.matches) {
          document.body.setAttribute('theme', 'dark')
        } else {
          document.body.removeAttribute('theme')
        }
      } else {
        if (theme === 'dark') {
          document.body.setAttribute('theme', 'dark')
        } else {
          document.body.removeAttribute('theme')
        }
      }`,
    },
  ],
})
</script>

<style scoped>
.title {
  background-color: var(--color-bg);
  color: var(--color-text);
}
</style>