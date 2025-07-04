import http from 'node:http';
import fs from 'node:fs';
import archiver from 'archiver';
import path from 'node:path';

const PORT = 3000;
const FILE_TO_ZIP = path.join(__dirname, 'files', '1937330293275095040.Lab'); // 要压缩的文件路径

const server = http.createServer((req, res) => {
  if (req.url === '/getLabFile') {
    // 检查文件是否存在
    if (!fs.existsSync(FILE_TO_ZIP)) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('File not found');
      return;
    }

    // 设置响应头，指定内容类型为 zip 文件
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename="archive.zip"');

    // 创建一个 archiver 实例
    const archive = archiver('zip', {
      zlib: { level: 9 } // 设置压缩级别
    });

    // 处理 archiver 的错误
    archive.on('error', (err) => {
      console.error(err);
      res.statusCode = 500;
      res.end('Error creating ZIP archive');
    });

    // 当 archiver 完成归档时，结束响应
    archive.on('end', () => {
      console.log('ZIP archive created successfully');
    });

    // 将 archive 的输出管道连接到 HTTP 响应
    archive.pipe(res);

    // 添加文件到归档
    archive.file(FILE_TO_ZIP, { name: '1937330293275095040.Lab' });

    // 完成归档
    archive.finalize();
  } else {
    // 处理其他请求
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, this is the server!');
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
