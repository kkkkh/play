import store from '@/store'

// 这里的权限：控制按钮的是否需要输入账号密码
const permissionControl = {
  name: 'permission-control',
  inserted(el, binding, vnode) {
    const value = binding.value

    if (!value.permissionCode) {
      console.log('v-permission-control no bind permissionCode')

      return
    }

    // 清除权限的方法
    const clearPermission = function () {
      store.commit('permission/clearExtraButtonPermissions', value.permissionCode)
    }

    // 获取权限校验方法
    // vue2中vnode.context为组件实例

    // 默认清除权限
    const isClearPermission =
      typeof value.isClearPermission === 'boolean' ? value.isClearPermission : true

    // 事件处理函数
    el.__permissionControlClick__ = (e) => {
      e.preventDefault()
      vnode.context.$EventBus.$emit('permission-control-show', {
        permissionCode: value.permissionCode,
        successPermissionCb: () => {
          if (typeof value.successPermissionCb === 'function') {
            value.successPermissionCb(clearPermission)
          }
          // 默认获取权限后，清除权限，下次再点击时，需要重新获取权限
          if (isClearPermission) clearPermission()
        },
        noPermissionHandle: () => {
          if (typeof value.noPermissionHandle === 'function') {
            value.noPermissionHandle()
          }
        },
      })
    }
    el.addEventListener('click', el.__permissionControlClick__)
  },
  unbind(el, binding) {
    // 移除事件监听
    if (el.__permissionControlClick__) {
      el.removeEventListener('click', el.__permissionControlClick__)
      delete el.__permissionControlClick__
    }
    const value = binding.value

    store.commit('permission/clearExtraButtonPermissions', value.permissionCode)
  },
}

export default permissionControl
