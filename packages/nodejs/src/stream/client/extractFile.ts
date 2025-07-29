import extract from 'extract-zip'
import { removeFileOrDir } from '../../../src/fs/main'


export function extractFile(
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
