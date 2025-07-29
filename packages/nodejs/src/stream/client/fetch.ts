import fs from 'node:fs'
import { extractFile } from './extractFile'
import { removeFileOrDir } from '../../../src/fs/main'
const { WritableStream } = require('stream/web');
export function processFileStream(response: Response, destDir: string, tempFile: string) {
  return new Promise<void>((resolve, reject) => {
    const uniqueTempPath = `${Date.now()}${Math.random().toString(16).slice(2)}${tempFile}`

    try {
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true })
      }
      const fileStream = fs.createWriteStream(uniqueTempPath)
      const reader = response.body?.getReader()

      const push = () => {
        reader
          ?.read()
          .then(({ done, value }) => {
            if (done) {
              fileStream.end()
              console.log('fileStream.end()')
              extractFile(uniqueTempPath, destDir, resolve, reject)
              reader?.releaseLock()

              return
            }
            console.log('value', value)
            const canContinue = fileStream.write(Buffer.from(value))

            if (canContinue) {
              push()
            } else {
              fileStream.once('drain', push)
            }
          })
          .catch((error) => {
            console.error('Error reading file:', error)
            // reject(new Error('Error reading file', { cause: error }))
            reject(new Error('Error reading file'))
          })
      }

      push()
      fileStream.on('error', () => {
        void removeFileOrDir(uniqueTempPath)
      })
    } catch (error) {
      void removeFileOrDir(uniqueTempPath)
      // showMessageBox('error', 'File stream processing error', error)
      reject(new Error(JSON.stringify(error)))
    }
  })
}


export function processFileStreamByPipe(response: Response, destDir: string, tempFile: string) {
  return new Promise<void>((resolve, reject) => {
    const uniqueTempPath = `${Date.now()}${Math.random().toString(16).slice(2)}${tempFile}`

    try {
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true })
      }
      const fileStream = fs.createWriteStream(uniqueTempPath)
      console.log('response.body', response.body)
      console.log('response.body.pipeTo', response.body?.pipeTo)
      console.log('response.body.pipeThrough', response.body?.pipeThrough)
      // const reader = response.body?.getReader()

      // const push = () => {
      //   reader
      //     ?.read()
      //     .then(({ done, value }) => {
      //       if (done) {
      //         fileStream.end()
      //         console.log('fileStream.end()')
      //         extractFile(uniqueTempPath, destDir, resolve, reject)
      //         reader?.releaseLock()

      //         return
      //       }
      //       console.log('value', value)
      //       const canContinue = fileStream.write(Buffer.from(value))

      //       if (canContinue) {
      //         push()
      //       } else {
      //         fileStream.once('drain', push)
      //       }
      //     })
      //     .catch((error) => {
      //       console.error('Error reading file:', error)
      //       // reject(new Error('Error reading file', { cause: error }))
      //       reject(new Error('Error reading file'))
      //     })
      // }

      // push()
      // fileStream.on('error', () => {
      //   void removeFileOrDir(uniqueTempPath)
      // })
    } catch (error) {
      void removeFileOrDir(uniqueTempPath)
      // showMessageBox('error', 'File stream processing error', error)
      reject(new Error(JSON.stringify(error)))
    }
  })
}
