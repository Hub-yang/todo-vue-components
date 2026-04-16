import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue(),
    UnoCSS({
      configFile: '../uno.config.ts',
    }),
  ],
  resolve: {
    alias: {
      'todo-vue-components': resolve(__dirname, '../packages/todo-vue-components/src/index.ts'),
      '@todo-vc/components': resolve(__dirname, '../packages/components/src/index.ts'),
      '@todo-vc/hooks': resolve(__dirname, '../packages/hooks/src/index.ts'),
      '@todo-vc/utils': resolve(__dirname, '../packages/utils/src/index.ts'),
      '@todo-vc/constants': resolve(__dirname, '../packages/constants/src/index.ts'),
    },
  },
})
