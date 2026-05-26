import { inject, type InjectionKey, type Plugin } from 'vue'

import { Bagel } from '../../BagelDB'

export const bagelInjectionKey = Symbol('bagel') as InjectionKey<Bagel>

export function useBagelDB() {
  const bagel = inject(bagelInjectionKey)
  if (!bagel) throw new Error('No bagel provided')

  return bagel
}

export default {
  install: (app) => {
    const bagel = new Bagel(import.meta.env.VITE_BAGELDB_TOKEN)
    app.config.globalProperties.$bagel = bagel
    app.provide(bagelInjectionKey, bagel)
  },
} as Plugin
