import { fileURLToPath, URL } from 'node:url'

import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  return defineConfig({
    plugins: [vue()],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '~bootstrap': resolve(__dirname, 'node_modules/bootstrap')
      }
    },
    server: {
      port: 5173,
      host: '0.0.0.0'
    },
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html')
          // home:resolve(__dirname,'src/pages/RoutePage/index.html'),
        }
      }
    }
  })
}
