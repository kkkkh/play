import fs from 'node:fs'
import path from 'node:path'
import { once } from 'node:events'
import { Writable } from 'node:stream'
import { createDirectory } from '../../fs'

export async function saveFileByFetchWebStream(
  response: Response,
  outputPath: string,
  fileName: string,
): Promise<string> {
  await createDirectory(outputPath)

  if (!response.ok) {
    throw new Error(`Download failed: ${response.status} ${response.statusText}`)
  }

  if (!response.body) {
    throw new Error('Response body is empty')
  }

  const finalFilePath = path.join(outputPath, fileName)
  const tempFilePath = `${finalFilePath}.part`

  const totalSize = Number.parseInt(response.headers.get('Content-Length') || '0', 10)
  const hasTotalSize = Number.isFinite(totalSize) && totalSize > 0

  let downloaded = 0
  const writer = fs.createWriteStream(tempFilePath)

  try {
    const progressTransform = new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        if (hasTotalSize) {
            downloaded += chunk.length
            const progress = (downloaded / totalSize) * 100
            console.log(`Downloading... ${progress.toFixed(2)}%`)
        }
        controller.enqueue(chunk)
      }
    })

    // Web ReadableStream -> TransformStream -> Node Writable converted to Web Writable
    await response.body
      .pipeThrough(progressTransform)
      .pipeTo(Writable.toWeb(writer) as globalThis.WritableStream<Uint8Array>)
    // pipeTo 成功返回后，说明写入流程结束
    await fs.promises.rename(tempFilePath, finalFilePath)
    console.log(`File downloaded successfully to ${finalFilePath}`)
    return finalFilePath
  } catch (error) {
    try {
      if (!writer.destroyed) {
        writer.destroy()
      }
    } catch {}

    try {
      await fs.promises.rm(tempFilePath, { force: true })
    } catch {}

    throw error
  }
}