import { defineConfig, mergeConfig } from 'vite'
import baseConfig from './vite.config.base'
import bigScreenConfig from './vite.config.bigScreen'

export default defineConfig(() => {
  return mergeConfig(baseConfig, bigScreenConfig)
})

