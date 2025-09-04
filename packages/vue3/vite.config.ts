import { defineConfig, mergeConfig } from 'vite'
import baseConfig from './vite.config.base.ts'
import bigScreenConfig from './vite.config.bigScreen.ts'

export default defineConfig(() => {
  return mergeConfig(baseConfig, bigScreenConfig)
})

