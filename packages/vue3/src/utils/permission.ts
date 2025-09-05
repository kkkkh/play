export const login = async (form: { username: string, password: string }): Promise<{ data: { success: boolean, message: string, permissions: string[] } }> => {
  return new Promise((resolve)=>{
    setTimeout(()=>{
      console.log(form)
      resolve({
        data: {
          success: true,
          message: '成功',
          permissions: ['test'],
        },
      })
    }, 1000)
  })
}
