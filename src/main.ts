import { BagelVue, RouterWrapper, type BagelOptions } from '@bagelink/vue'
import { createPinia } from 'pinia'
import { createApp, markRaw } from 'vue'

import App from './DashboardApp.vue'
import router from './router'
import '@bagelink/vue/dist/style.css'

import '@/styles/theme.css'
import '@/styles/main.css'

const app = createApp(App)

const bagelConfig: BagelOptions = {}
app.use(BagelVue, bagelConfig)

app.use(router)

const pinia = createPinia()
pinia.use(({ store }) => (store.router = markRaw(router)))
app.use(pinia)
app.component('RouterWrapper', RouterWrapper)
app.mount('#app')
