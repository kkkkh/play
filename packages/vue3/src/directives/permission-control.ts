import type { DirectiveBinding } from 'vue'

// import { NewPermissionControlKey } from '@/constants/injection'
import { useAuthStore } from '@/store/modules/auth'
import emitter from '@/utils/mitt'
import { NewPermissionControlKey } from '@/constants/injection'
// 这里的权限：控制按钮的是否需要输入账号密码
const permissionControl = {
  mounted(el: HTMLElement, binding: DirectiveBinding, vnode: any) {
    const { value } = binding
    const { format = 'emitter' } = value
    const authStore = useAuthStore()

    if (!value.permissionCode) {
      console.log('v-permission-control no bind permissionCode')

      return
    }

    const clearPermission = () => {
      authStore.clearExtraButtonPermissions(value.permissionCode)
    }
    // Remove any existing click listeners by cloning and replacing the element
    // const newEl = el.cloneNode(true) as HTMLElement

    // el.parentNode?.replaceChild(newEl, el)
    const isClearPermission = typeof value.isClearPermission === 'boolean' ? value.isClearPermission : true

    el.addEventListener('click', () => {
      // 触发方式有两种：
      // eventBus触发
      if (format === 'emitter') {
        emitter.emit('permission-control-show', {
          permissionCode: value.permissionCode,
          successPermissionCb: () => {
            value.successPermissionCb?.(clearPermission)
            if (isClearPermission) clearPermission()
          },
          noPermissionHandle: () => {
            value.noPermissionHandle?.()
          },
        })
      // provide触发
      } else if (format === 'provide') {
        // #region provide
        const newPermissionControl = vnode?.ctx?.provides[NewPermissionControlKey]
        newPermissionControl(
          value.permissionCode,
          () => {
            value.successPermissionCb?.(clearPermission)
            // 默认获取权限后，清除权限，下次再点击时，需要重新获取权限
            if (isClearPermission) clearPermission()
          },
          () => {
            value.noPermissionHandle?.()
          }
        )
        // #endregion provide
      }
    })
  },
  unmounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding
    const newEl = el.cloneNode(true) as HTMLElement

    el.parentNode?.replaceChild(newEl, el)
    const authStore = useAuthStore()

    authStore.clearExtraButtonPermissions(value.permissionCode)
  },
}

export default permissionControl
