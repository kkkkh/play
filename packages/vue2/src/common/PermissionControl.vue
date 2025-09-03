<template>
  <el-dialog
    class="dialog-form"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    :visible.sync="dialogVisible"
    width="500px"
  >
    <el-form ref="form" class="login-form" :model="form" :rules="rules">
      <el-form-item prop="username">
        <el-input
          ref="usernameInputRef"
          v-model="form.username"
          placeholder="请输入账号"
          type="text"
          autocomplete="on"
          @keydown.enter.native="handleEnter"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          ref="passwordInputRef"
          v-model="form.password"
          autocomplete="on"
          placeholder="请输入密码"
          show-password
          type="input"
          @keydown.enter.native="handleSave"
        />
      </el-form-item>
    </el-form>

    <div slot="footer">
      <el-button size="mini" @click="handleClose">取消</el-button>
      <el-button :loading="saveLoading" size="mini" type="primary" @click="handleSave">
        保存
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import { login } from '@/utils/permission'

const initForm = {
  username: '',
  password: '',
}

export default {
  name: 'EditModal',
  data() {
    return {
      saveLoading: false,
      dialogVisible: false,
      form: {
        ...initForm,
      },
      permissionMap: new Map(),
      currentPermissionCode: '',
    }
  },

  computed: {
    rules() {
      return {
        username: [
          { required: true, trigger: ['blur', 'change'], message: '登录账号不能为空' },
        ],
        password: [
          { required: true, trigger: ['blur', 'change'], message: '密码不能为空' },
        ],
      }
    },
    ...mapGetters({
      extraBtnPermission: 'permission/extraBtnPermission',
    }),
  },
  mounted() {
    this.$EventBus.$on('permission-control-show', (params) => {
      this.show(params.permissionCode, params.successPermissionCb, params.noPermissionHandle)
    })
  },
  beforeDestroy() {
    this.$EventBus.$off('permission-control-show')
  },
  methods: {
    ...mapMutations({
      setExtraButtonPermissions: 'permission/setExtraButtonPermissions',
      clearExtraButtonPermissions: 'permission/clearExtraButtonPermissions',
    }),
    handleClose() {
      this.$refs.form.resetFields()
      this.dialogVisible = false
    },
    show(permissionCode, successHandle, noPermissionHandle) {
      console.log('this.extraBtnPermission', this.extraBtnPermission)
      const isPermission = this.extraBtnPermission.has(permissionCode)

      if (isPermission) {
        this.dialogVisible = false
        successHandle?.()
      } else {
        this.permissionMap.set(permissionCode, successHandle)
        this.currentPermissionCode = permissionCode
        this.dialogVisible = true
        noPermissionHandle?.()
      }
    },
    async handleSave() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true

          try {
            const form = new FormData()

            form.append('password', this.form.password)
            form.append('username', this.form.username)
            const result = await login(form)

            if (result.data.permissions?.length && result.data.permissions.includes(this.currentPermissionCode)) {
              this.setExtraButtonPermissions(this.currentPermissionCode)
              this.permissionMap.get(this.currentPermissionCode)?.()
              this.handleClose()
            } else {
              this.$message.warning('没有权限')
            }
          } catch (error) {
            console.log(error)
            // debugger
            // ignore
          } finally {
            this.loading = false
          }
        }
      })
    },
    handleEnter() {
      this.$refs.passwordInputRef.focus()
    },
  },
}
</script>
