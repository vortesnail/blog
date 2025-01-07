import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import useThemeStroe from './theme'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export { useThemeStroe }
export default pinia
