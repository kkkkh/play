import fs from 'node:fs'
import { extractFile, removeFileOrDir, createDirectory } from '../../fs'
import path from 'node:path'


export async function saveFileByFetchManual(response: Response, destDir: string, tempFile: string) {
    const uniqueTempPath = path.join(destDir, tempFile)
    // const uniqueTempPath = `${Date.now()}${Math.random().toString(16).slice(2)}${tempFile}`
    try {
      /* 
        Content-Length 可能拿不到，进度计算会有问题
        const progress = (downloaded / totalSize) * 100这会有问题：Infinity、NaN 
      */
      const totalSize = Number.parseInt(response.headers.get('Content-Length') || '0')
      let downloaded = 0

      await createDirectory(destDir)
      /* 
        没有原子写入，失败后可能残留半文件
        如果下载中断：可能留下半截 zip / exe / pkg，下次程序误以为文件已存在，或解压读到脏文件
        先写临时文件：xxx.zip.part，下载完成、校验通过后再 rename 成正式文件。 
      */
      const writer = fs.createWriteStream(uniqueTempPath)
      const reader = response.body?.getReader()

      const pump = async () => {
        /* 
          表面上看好像兜底了，但实际上这会把：
          response.body 根本不存在：body 已被消费，网络层异常导致没有可读流，这种本应报错的情况，默默变成：done = true，然后走“下载成功”逻辑。 
          如果 response.body 不存在，应该直接抛错
        */
        const { done, value } = (await reader?.read()) ?? { done: true, value: new Uint8Array() }
        if (done) {
          console.log('downloaded')
          /* 
            writer.end() 只是告诉 writable stream：我不再写了。
            它不等于：
              数据已经全部 flush 到磁盘，文件句柄已经关闭，文件已经完全可安全读取 
            真正稳妥应该等：
              finish，更严一点再等 close
            你可能会出现：
              文件还没彻底写完，就开始 extractInstall，备份逻辑读取到不完整文件，偶发解压失败、文件校验失败、Windows 文件占用问题
          */
          writer.end()
          reader?.releaseLock()
          // 成功逻辑里混入了异步副作用，但没统一等待
          // 尤其如果 extractInstall 失败了：外层 try/catch 抓不到，用户层面可能已经认为成功，状态机会乱
          void extractFile(uniqueTempPath, destDir)

          return
        }
        downloaded += value.length
        const progress = (downloaded / totalSize) * 100

        console.log(`Downloading... ${progress.toFixed(2)}%`)

        const canContinue = writer.write(Buffer.from(value))
        // console.log('canContinue', canContinue)
        if (!canContinue) {
          await new Promise<void>((resolve) => {
            writer.once('drain', resolve)
          })
        }
  
        // 继续读取下一块数据
        await pump()

      }

      await pump()
      // writer.on('error', ...) 绑定太晚了
      // 因为在 pump() 过程中，writer.write() 早就在执行。
      // 如果中途 writer 出错，可能错误已经发生了，但你监听器还没挂上。
      writer.on('error', () => {
        void removeFileOrDir(uniqueTempPath)
      })
    } catch (error) {
      void removeFileOrDir(uniqueTempPath)
      throw new Error(JSON.stringify(error))
    }
}
