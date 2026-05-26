import { cwd } from 'node:process'
import { URL, fileURLToPath } from 'node:url'
// import { sentryVitePlugin } from '@sentry/vite-plugin'
import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from 'vite'

const env = loadEnv('', cwd())

const plugins = [
  vue(),
  // sentryVitePlugin({
  // 	telemetry: false,
  // 	authToken: procEnv.VITE_SENTRY_AUTH_TOKEN,
  // 	org: 'bagelstudio',
  // 	project: 'REAPLACE_ME',
  // 	sourcemaps: { filesToDeleteAfterUpload: ['dist/**/*.js.map'] },
  // }),
]

export default defineConfig({
  plugins,
  build: {
    sourcemap: true, // Source map generation must be turned on for Sentry to work
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      ...(env.VITE_LINK_BAGEL
        ? {
            '@bagelink/vue/dist/style.css': fileURLToPath(
              new URL('../bagelink/packages/vue/src/styles/bagel.css', import.meta.url),
            ),
            '@bagelink/vue': fileURLToPath(
              new URL('../bagelink/packages/vue/src/index.ts', import.meta.url),
            ),
            '@bagelink/sdk': fileURLToPath(
              new URL('../bagelink/packages/sdk/src/index.ts', import.meta.url),
            ),
          }
        : {}),
    },
  },
})
