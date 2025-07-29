import fs from 'node:fs'
import { extractFile } from './extractFile'
import { removeFileOrDir } from '../../../src/fs/main'
import { AxiosResponse } from 'axios'

export function processFileStream(response: AxiosResponse, destDir: string, tempFile: string) {
  return new Promise<void>((resolve, reject) => {
    const uniqueTempPath = `${Date.now()}${Math.random().toString(16).slice(2)}${tempFile}`

    try {
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true })
      }
      const fileStream = fs.createWriteStream(uniqueTempPath)
      console.log('response.data', response.data)
      console.log('response.data.pipe', response.data.pipe)
      console.log('response.data.getReader', response.data.getReader)
      response.data.pipe(fileStream)
      console.log()
      fileStream.on('finish', () => {
        extractFile(uniqueTempPath, destDir, resolve, reject)
      })
      fileStream.on('error', (error) => {
        void removeFileOrDir(uniqueTempPath)
        reject(new Error(JSON.stringify(error)))
      })
    } catch (error) {
      void removeFileOrDir(uniqueTempPath)
      // showMessageBox('error', 'File stream processing error', error)
      reject(new Error(JSON.stringify(error)))
    }
  })
}
