export const login = async (form,status) => {
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
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
