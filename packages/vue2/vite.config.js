import { defineConfig } from 'vite'
import vue2 from '@vitejs/plugin-vue2'
import { fileURLToPath, URL } from 'url';
import Components from 'unplugin-vue-components/vite'
import { ElementUiResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue2(),
    Components({
      resolvers: [ElementUiResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
