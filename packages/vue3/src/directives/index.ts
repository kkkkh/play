import type { App } from 'vue'

import enableKeyboard from '@/directives/enable-keyboard'
import permissionControl from '@/directives/permission-control'

export function setupDirectives(app: App) {
  // 注册全局指令
  app.directive('permission-control', permissionControl)
  app.directive('enable-keyboard', enableKeyboard)
}
