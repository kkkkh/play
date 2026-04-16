import { createDirectory } from '../../fs'
import fs from 'node:fs'
import path from 'node:path'
import { Readable, Transform } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import type { ReadableStream } from 'node:stream/web'

export async function saveFileByFetchNodeStream(
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

  const progressTransform = new Transform({
    transform(chunk, _encoding, callback) {

      if (hasTotalSize) {
        downloaded += chunk.length
        const progress = (downloaded / totalSize) * 100
        console.log(`Downloading... ${progress.toFixed(2)}%`)
      }

      callback(null, chunk)
    }
  })

  const writeStream = fs.createWriteStream(tempFilePath)

  try {
    // Web ReadableStream -> Node Readable
    const nodeReadable = Readable.fromWeb(
      response.body as unknown as ReadableStream<Uint8Array>
    )

    await pipeline(
      nodeReadable,
      progressTransform,
      writeStream
    )

    await fs.promises.rename(tempFilePath, finalFilePath)

    return finalFilePath
  } catch (error) {
    try {
      if (!writeStream.destroyed) {
        writeStream.destroy()
      }
    } catch {}

    try {
      await fs.promises.rm(tempFilePath, { force: true })
    } catch {}

    throw error
  }
}