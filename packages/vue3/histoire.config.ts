import { defineConfig } from 'histoire'
import { HstVue } from '@histoire/plugin-vue'

export default defineConfig({
  plugins: [
    HstVue(),
  ],
  outDir: '../../docs/vue3',
  storyMatch: [
    '**/src/**/*.story.vue',
  ],
  storyIgnored: [
    '**/node_modules/**',
    '**/dist/**',
  ],
  vite: {
    base: '/play/vue3/',
    // optimizeDeps: {
    //   include: ['vueuc','date-fns-tz'], // 不起作用
    // },
    ssr: {
      // 因为引入ui组件，naive-ui在histoire build 的时候报错
      // vueuc 和 date-fns-tz 都是按照commonjs 加载了
      // 这里要错一层处理
      /*
        Histoire 在收集 stories 时，其实是跑在 Node ESM 环境下（类似 SSR）。
        默认情况下，Vite 会把 node_modules 的依赖标记为 external，也就是 Node 自己去解析。
        这条配置告诉 Vite：
        “不要把这些包当外部模块，让 Vite 直接打包/编译成 ESM 再给 Node 用。”
        因为 date-fns-tz 的 ESM 包和 CommonJS 包混合，Node 直接去解析目录导入就会报错 (ERR_UNSUPPORTED_DIR_IMPORT)。
        加了 noExternal 后，Vite 自己处理成干净的 ESM，Node 就能直接执行，不再报错。 */
      /*
        为什么本地没问题，CI 报错
        本地 Windows/macOS 文件系统大小写不敏感，Node 对导入目录有容错。
        CI 是 Linux，大小写敏感，Node 的 ESM loader 对目录导入严格检查 → 如果不经过 Vite 编译，就会报 ERR_UNSUPPORTED_DIR_IMPORT。
        ssr.noExternal 让 Vite 在收集 stories 阶段先把模块打包成 ESM → Node 就能正确加载。

        https://chatgpt.com/c/68ba9b4a-d4a4-832c-9167-642e78450e25
      */
      noExternal: ['naive-ui', 'vueuc', 'date-fns-tz'], // 确保 SSR / 构建时不会当作 CJS 起作用
    },
    // resolve: {
    //   alias: {
    //     'date-fns-tz/dist/esm': 'date-fns-tz/dist/esm/index.js', // 不起作用
    //   },
    // },
  },
  setupFile: './histoire.setup.ts',
})
