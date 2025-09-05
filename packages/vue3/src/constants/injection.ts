export const NewPermissionControlKey = Symbol('NewPermissionControl') as InjectionKey<
  (
    permissionCode: string,
    successPermissionCb?: () => void,
    noPermissionHandle?: () => void,
  ) => void
>
