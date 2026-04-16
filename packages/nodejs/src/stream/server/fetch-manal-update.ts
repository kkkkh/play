import fs from 'node:fs'
import path from 'node:path'
import { once } from 'node:events'
import { createDirectory, removeFileOrDir, extractFile } from '../../fs'

export async function saveFileByFetchManualUpdate(
  response: Response,
  outputPath: string,
  fileName: string,
): Promise<void> {

  let writer: fs.WriteStream | null = null
  let tempFilePath = ''
  let finalFilePath = ''

  try {
    await createDirectory(outputPath)

    if (!response.ok) {
      throw new Error(`Download failed: ${response.status} ${response.statusText}`)
    }

    if (!response.body) {
      throw new Error('Response body is empty')
    }

    finalFilePath = path.join(outputPath, fileName)
    tempFilePath = `${finalFilePath}.part`

    const totalSize = Number.parseInt(response.headers.get('Content-Length') || '0', 10)
    const hasTotalSize = Number.isFinite(totalSize) && totalSize > 0
    let downloaded = 0

    const reader = response.body.getReader()
    writer = fs.createWriteStream(tempFilePath)

    // 先挂错误监听，避免时序问题
    const writerErrorPromise = once(writer, 'error').then(([error]) => {
      throw error
    })

    try {
      while (true) {
        const readResult = await Promise.race([
          reader.read(),
          writerErrorPromise
        ]) as ReadableStreamReadResult<Uint8Array>

        const { done, value } = readResult

        if (done) {
          break
        }

        downloaded += value.length

        if (hasTotalSize) {
          const progress = (downloaded / totalSize) * 100
          console.log(`Downloading... ${progress.toFixed(2)}%`)
        } 

        const canContinue = writer.write(Buffer.from(value))
        // console.log('canContinue', canContinue)
        if (!canContinue) {
          await Promise.race([
            /*
                once(writer, 'drain')  等于
                await new Promise((resolve) => {
                    writer.once('drain', (...args) => {
                        resolve(args)
                    })
                }) 
            */
            once(writer, 'drain'),
            writerErrorPromise
          ])
          console.log('drain')
        }
      }
    } finally {
      reader.releaseLock()
    }

    // 告诉 writer 没有更多数据了
    writer.end()

    // 等待真正写完，而不是只调用 end()
    await Promise.race([
      once(writer, 'finish'),
      writerErrorPromise
    ])

    // 某些场景下再等 close 会更稳一些
    await once(writer, 'close')

    // 下载完成后，把 .part 原子替换成正式文件
    await fs.promises.rename(tempFilePath, finalFilePath)

    // 到这里，才算“文件真正下载完成且可用”
    console.log(`File downloaded successfully to ${finalFilePath}`)
    
    await extractFile(finalFilePath, outputPath)
  } catch (error) {
    try {
      if (writer && !writer.destroyed) {
        writer.destroy()
      }
    } catch {}

    try {
      if (tempFilePath) {
        await fs.promises.rm(tempFilePath, { force: true })
      }
    } catch {}

    try {
      await removeFileOrDir(outputPath)
    } catch {}


    throw error
  }
}