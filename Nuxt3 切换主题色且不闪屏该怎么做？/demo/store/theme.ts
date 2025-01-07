import { defineStore } from 'pinia'

export type ThemeType = 'system' | 'light' | 'dark'

export interface GlobalState {
  fakeTheme: ThemeType
  theme: Exclude<ThemeType, 'system'>
}

const useThemeStroe = defineStore('global', {
  state: (): GlobalState => ({
    fakeTheme: 'light',
    theme: 'light',
  }),
  actions: {
    setRealTheme(theme: Exclude<ThemeType, 'system'>) {
      this.theme = theme
      if (theme === 'light') {
        document.body.removeAttribute('theme')
      } else {
        document.body.setAttribute('theme', 'dark')
      }
    },
    setTheme(theme: ThemeType) {
      window.localStorage.setItem('theme', theme)
      this.fakeTheme = theme
      if (theme === 'system') {
        const themeMedia = window.matchMedia('(prefers-color-scheme: dark)')
        this.setRealTheme(themeMedia.matches ? 'dark' : 'light')
        themeMedia.addEventListener('change', (evt) => {
          const t = evt.matches ? 'dark' : 'light'
          this.setRealTheme(t)
        })
      } else {
        this.setRealTheme(theme)
      }
    },
  },
  persist: true,
})

export default useThemeStroe
