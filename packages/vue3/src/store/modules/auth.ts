import { defineStore } from 'pinia'

export interface AuthState {
  extraBtnPermission: Set<string>
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    extraBtnPermission: new Set(),
  }),
  getters: {
  },
  actions: {
    setExtraButtonPermissions(data: string) {
      this.extraBtnPermission.add(data)
    },
    clearExtraButtonPermissions(data: string) {
      if (this.extraBtnPermission.has(data)) {
        this.extraBtnPermission.delete(data)
      }
    },
  },
})
