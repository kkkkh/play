<template>
  <div>
    <n-modal v-model:show="dialogVisible" :mask-closable="false">
      <n-dialog
        :loading="loading"
        close-on-esc
        negative-text="取消"
        :on-close="onClose"
        positive-text="保存"
        title="请登录"
        width="70vw"
        @negative-click="onClose"
        @positive-click="handleConfirm"
      >
        <n-form ref="formRef" :label-width="80" :model="formValue">
          <n-form-item
            path="username"
            :rule="[{ required: true, trigger: 'blur', message: '请输入' }]"
          >
            <n-input
              ref="usernameInputRef"
              v-model:value="formValue.username"
              placeholder="请输入MOM账号"
              @keyup.enter="handleEnter"
            />
          </n-form-item>
          <n-form-item
            path="password"
            :rule="[{ required: true, message: '请输入', trigger: 'blur' }]"
          >
            <n-input
              ref="passwordInputRef"
              v-model:value="formValue.password"
              type="password"
              placeholder="请输入登录密码"
              @keydown.enter="handleConfirm"
            />
          </n-form-item>
        </n-form>
      </n-dialog>
    </n-modal>
  </div>
</template>

<script lang="ts" setup>

import { useAuthStore } from '@/store/modules/auth'
import emitter from '@/utils/mitt'
import { login } from '@/utils/permission'

const authStore = useAuthStore()

const dialogVisible = ref(false)
const formRef = ref()
const formValue = reactive({
  username: '',
  password: '',
})
const passwordInputRef = ref<HTMLInputElement | null>(null)

const onClose = () => {
  formValue.username = ''
  formValue.password = ''
  dialogVisible.value = false
}
const permissionMap = new Map<string, (() => void) | undefined>()

onMounted(() => {
  emitter.on('permission-control-show', (params) => {
    show(params.permissionCode, params.successPermissionCb, params.noPermissionHandle)
  })
})

onUnmounted(() => {
  emitter.off('permission-control-show')
})

const message = useMessage()
const loading = ref(false)
const usernameInputRef = ref<HTMLInputElement | null>(null)
const currentPermissionCode = ref('')

const handleConfirm = () => {
  formRef.value?.validate(async (errors: boolean) => {
    if (errors) {
      console.log(errors)
    } else {
      try {
        loading.value = true
        const {data: { permissions:buttonPermissions } } = await login({
          username: formValue.username,
          password: formValue.password,
        }
        )

        if (buttonPermissions.includes(currentPermissionCode.value)) {
          authStore.setExtraButtonPermissions(currentPermissionCode.value)
          permissionMap.get(currentPermissionCode.value)?.()
          onClose()
        } else {
          message.error('没有权限')
        }
      } catch (error: any) {
        console.log(error)
      } finally {
        loading.value = false
      }
    }
  })
}

function show(permissionCode: string, successHandle?: () => void, noPermissionHandle?: () => void) {
  const isPermission = authStore.extraBtnPermission.has(permissionCode)

  if (isPermission) {
    dialogVisible.value = false
    successHandle?.()
  } else {
    permissionMap.set(permissionCode, successHandle)
    currentPermissionCode.value = permissionCode
    dialogVisible.value = true
    noPermissionHandle?.()
  }
}

function handleEnter() {
  passwordInputRef.value?.focus()
}

defineExpose<{
  show(permissionCode: string, successHandle?: () => void, noPermissionHandle?: () => void): void
}>({ show })
</script>
