import axios from 'axios'
import http from 'node:http'
import fs from 'node:fs'
import extract from 'extract-zip'
import { removeFileOrDir } from '../../../src/fs/main'
import path from 'node:path'

const client = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000000,
})

function extractFile(
  uniqueTempPath: string,
  destDir: string,
  resolve: (value: void | PromiseLike<void>) => void,
  reject: (reason?: any) => void,
) {
  extract(uniqueTempPath, { dir: destDir })
    .then(() => {
      void removeFileOrDir(uniqueTempPath)
      resolve()
    })
    .catch((error) => {
      void removeFileOrDir(uniqueTempPath)
      // showMessageBox('error', 'Unzip file error', error)
      reject(new Error(JSON.stringify(error)))
    })
}

function processFileStream(response: Response, destDir: string, tempFile: string) {
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

const getStream = async () => {
  const response = await fetch('http://localhost:3000/getLabFile');
  const filesPath = path.resolve(__dirname, './files')
  processFileStream(response, filesPath, `temp.zip`)
}

getStream()
