import { BagelVue, DialogPlugin, RouterWrapper, type BagelOptions } from '@bagelink/vue'
import { createPinia } from 'pinia'
import { createApp, markRaw } from 'vue'

import App from './App.vue'
import bagelDBPlugin from './plugin/bagelDB'
import router from './router'
import '@bagelink/vue/dist/style.css'

import '@/styles/theme.css'
import '@/styles/main.css'

const app = createApp(App)

app.use(bagelDBPlugin)

const bagelConfig: BagelOptions = {}
app.use(BagelVue, bagelConfig)
app.use(DialogPlugin)

app.use(router)

const pinia = createPinia()
pinia.use(({ store }) => (store.router = markRaw(router)))
app.use(pinia)
app.component('RouterWrapper', RouterWrapper)
app.mount('#app')
