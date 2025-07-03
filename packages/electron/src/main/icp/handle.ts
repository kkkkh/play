import { ipcMain } from 'electron'

const printHandle = (): void => {
  ipcMain.handle('print', async (event, ...args) => {
    console.log('event', event)
    console.log('print', args)
    return 'print'
  })
}
export const ipcMainHandle = (): void => {
  printHandle()
}
