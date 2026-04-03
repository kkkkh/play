import http, { IncomingMessage, ServerResponse } from 'node:http'
import fs from 'node:fs'
import { open } from 'node:fs/promises'
import path from 'node:path'
import archiver from 'archiver'
import { Writable } from 'node:stream'

const PORT = 3000

type RouteHandler = (
  req: IncomingMessage,
  res: ServerResponse
) => void | Promise<void>

interface ZipFileOptions {
  filePath: string
  zipFileName?: string
  entryName?: string
}

interface SendFileOptions {
  filePath: string
  downloadFileName?: string
  contentType?: string
}

/**
 * 统一发送文本响应
 */
function sendText(
  res: ServerResponse,
  statusCode: number,
  text: string
): void {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.end(text)
}

/**
 * 统一发送 JSON 响应
 */
function sendJSON(
  res: ServerResponse,
  statusCode: number,
  data: unknown
): void {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(data))
}

/**
 * 检查文件是否存在
 */
function ensureFileExists(res: ServerResponse, filePath: string): boolean {
  if (!fs.existsSync(filePath)) {
    sendText(res, 404, 'File not found')
    return false
  }

  return true
}

/**
 * 动态压缩单个文件并输出到响应流
 */
function streamZipFile(
  res: ServerResponse,
  options: ZipFileOptions
): void {
  const {
    filePath,
    zipFileName = 'archive.zip',
    entryName = path.basename(filePath)
  } = options

  if (!ensureFileExists(res, filePath)) {
    return
  }

  res.statusCode = 200
  res.setHeader('Content-Type', 'application/zip')
  res.setHeader('Content-Disposition', `attachment; filename="${zipFileName}"`)

  const archive = archiver('zip', {
    zlib: { level: 9 }
  })

  archive.on('error', (err: Error) => {
    console.error('ZIP error:', err)

    if (!res.headersSent) {
      sendText(res, 500, 'Error creating ZIP archive')
      return
    }

    res.destroy(err)
  })

  archive.on('end', () => {
    console.log('ZIP archive created successfully')
  })

  archive.pipe(res)
  archive.file(filePath, { name: entryName })
  void archive.finalize()
}

/**
 * 旧写法：Node.js Stream
 * 使用 fs.createReadStream(filePath).pipe(res)
 */
async function sendFileByNodeStream(
  res: ServerResponse,
  options: SendFileOptions
): Promise<void> {
  const {
    filePath,
    downloadFileName = path.basename(filePath),
    contentType = 'application/octet-stream'
  } = options

  if (!ensureFileExists(res, filePath)) {
    return
  }

  res.statusCode = 200
  res.setHeader('Content-Type', contentType)
  res.setHeader('Content-Disposition', `attachment; filename="${downloadFileName}"`)
  res.setHeader('Content-Length', (await fs.promises.stat(filePath)).size)

  const readStream = fs.createReadStream(filePath)

  readStream.on('error', (err) => {
    console.error('Node stream file error:', err)

    if (!res.headersSent) {
      sendText(res, 500, 'Error reading file')
      return
    }

    res.destroy(err)
  })

  readStream.pipe(res)
}

// 把一个纯 Web 风格的底层字节缓冲区，包成 Node 风格的二进制块。
const normalizeChunk = new TransformStream({
  transform(chunk, controller) {
    if (chunk instanceof ArrayBuffer) {
      controller.enqueue(Buffer.from(chunk))
      return
    }
    // chunk 不是裸 ArrayBuffer，但它是“建立在 ArrayBuffer 之上的视图类型”。
    // Uint8Array、Uint16Array、DataView
    if (ArrayBuffer.isView(chunk)) {
      controller.enqueue(
        Buffer.from(chunk.buffer, chunk.byteOffset, chunk.byteLength)
      )
      return
    }

    controller.enqueue(chunk)
  }
})


/**
 * 新写法：Web Streams
 * 使用 fileHandle.readableWebStream() + Writable.toWeb(res)
 */
async function sendFileByWebStream(
  res: ServerResponse,
  options: SendFileOptions
): Promise<void> {
  const {
    filePath,
    downloadFileName = path.basename(filePath),
    contentType = 'application/octet-stream'
  } = options

  if (!ensureFileExists(res, filePath)) {
    return
  }

  res.statusCode = 200
  res.setHeader('Content-Type', contentType)
  res.setHeader('Content-Disposition', `attachment; filename="${downloadFileName}"`)
  res.setHeader('Content-Length', (await fs.promises.stat(filePath)).size)


  let fileHandle: Awaited<ReturnType<typeof open>> | null = null

  try {
    // fileHandle 理解为 一个“已经打开的文件控制器/句柄”
    // 它不是文件内容本身，而是一个“以后可以继续读这个文件”的操作对象。
    fileHandle = await open(filePath, 'r')
    // 把这个文件句柄，转换成一个 Web 标准的可读流。
    // 这个 webReadable 是 文件字节流
    const webReadable = fileHandle.readableWebStream()
    // 把 Node 的 ServerResponse，包装成一个 Web 标准的可写流。
    // res 原本是 Node 风格的 writable stream
    // pipeTo() 需要的是 Web WritableStream
    const webWritable = Writable.toWeb(res)
    // 先通过 normalizeChunk 把 webReadable 里的数据，转换成 Buffer
    // 如果不进行转换，那么 webReadable “读出来的 chunk 类型”和“ServerResponse 最终能写入的类型”不匹配
    // 把 webReadable 里的数据，持续写入 webWritable，直到完成。
    await webReadable.pipeThrough(normalizeChunk as any).pipeTo(webWritable)
  } catch (err) {
    console.error('Web stream file error:', err)

    if (!res.headersSent) {
      sendText(res, 500, 'Error reading file')
      return
    }

    res.destroy(err as Error)
  } finally {
    if (fileHandle) {
      // 不管成功还是失败，只要文件已经打开了，就尽量关掉。
      await fileHandle.close().catch((closeErr) => {
        console.error('Close fileHandle error:', closeErr)
      })
    }
  }
}

/**
 * 路由表
 */
const routes: Record<string, RouteHandler> = {
  '/': (_req, res) => {
    sendText(res, 200, 'Hello, this is the server!')
  },

  '/health': (_req, res) => {
    sendJSON(res, 200, {
      success: true,
      message: 'Server is running'
    })
  },

  /**
   * 动态压缩 .Lab 文件后返回 zip
   */
  '/getZipFile': (_req, res) => {
    // 原始文件：用于“动态压缩后返回”
    const LAB_FILE_PATH = path.join(__dirname, 'files', '1937330293275095040.Lab')
    streamZipFile(res, {
      filePath: LAB_FILE_PATH,
      zipFileName: 'archive.zip',
      entryName: '1937330293275095040.Lab'
    })
  },

  /**
   * 直接返回现成 zip 文件（Node Stream 写法）
   */
  '/getFileByNodeStream': async (req, res) => {
    console.log('getFileByNodeStream')

    const host = req.headers.host ?? 'localhost:3000'
    const url = new URL(req.url ?? '/', `http://${host}`)
    const version = url.searchParams.get('version')

    const filePath = path.join(__dirname, 'files',  `${version}.zip`)
    await sendFileByNodeStream(res, {
      filePath,
      downloadFileName: `${version}.zip`,
      contentType: 'application/octet-stream'
    })
  },

  /**
   * 直接返回现成 zip 文件（Web Streams 写法）
   */
  '/getFileByWebStream': async (req, res) => {
    console.log('getFileByWebStream')
    const host = req.headers.host ?? 'localhost:3000'
    const url = new URL(req.url ?? '/', `http://${host}`)
    const version = url.searchParams.get('version')

    const filePath = path.join(__dirname, 'files',  `${version}.zip`)
    await sendFileByWebStream(res, {
      filePath,
      downloadFileName: `${version}.zip`,
      contentType: 'application/octet-stream'
    })
  }
}

/**
 * 创建服务
 */
const server = http.createServer(async (req: IncomingMessage, res: ServerResponse) => {
  const host = req.headers.host ?? `localhost:${PORT}`
  const url = new URL(req.url ?? '/', `http://${host}`)
  const pathname = url.pathname

  const handler = routes[pathname]

  if (!handler) {
    sendText(res, 404, 'Not found')
    return
  }

  try {
    await handler(req, res)
  } catch (error) {
    console.error('Server error:', error)

    if (!res.headersSent) {
      sendText(res, 500, 'Internal server error')
      return
    }

    res.destroy(error as Error)
  }
})

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`)
})
