import fs from 'node:fs';
import path from 'node:path';
import extract from 'extract-zip'


export function extractFile(
  uniqueTempPath: string,
  destDir: string,
) {
  extract(uniqueTempPath, { dir: destDir })
    .then(() => {
    })
    .catch((error) => {
    })
}


export const createDirectory = async (folderPath:string) => {
  // 是否存在 path
  if (fs.existsSync(folderPath)) {
    // 获取目标路径的详细文件信息
    const stats = fs.lstatSync(folderPath)
    // 是否是文件夹
    if (stats.isDirectory()) {
      return
    }

    throw new Error('Path exists but is not a directory')
  }
  // 不存在，创建文件夹
  await fs.promises.mkdir(folderPath, { recursive: true })
}

export const createFile = async (filePath:string) => {
  if (fs.existsSync(filePath)) {
    console.log('file exists')
    return
  }
  // 目录和文件分开处理
  // 获取目录路径
  const dirPath = path.dirname(filePath);

  await createDirectory(dirPath)

  await fs.promises.writeFile(filePath, '')
}

export const readDirectory = async (folderPath:string) => {
  const files = await fs.promises.readdir(folderPath)
  // return files.map(file => path.resolve(folderPath, file))
  return  files
}


export async function removeFileOrDir(dirPath: string): Promise<void> {
  if (!fs.existsSync(dirPath)) {
    return void 0
  }

  const stats = fs.lstatSync(dirPath)

  if (stats.isDirectory()) {
    return fs.promises.rm(dirPath, { recursive: true })
  }

  return fs.promises.unlink(dirPath)
}

