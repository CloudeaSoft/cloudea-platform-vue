import { createPinia } from 'pinia'
import { persistedState } from './plugins/persistState'

const pinia = createPinia()

pinia.use(persistedState)

export default pinia

export * from './modules/user'
