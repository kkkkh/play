import express from 'express';
import fs from 'fs';
import path from 'path';
const app = express();

// http://localhost:3001/download 浏览器直接访问，直接下载文件

app.get('/download', async (req: any, res: any) => {
  console.log('download server');
  const filePath = path.resolve(__dirname, '../files/download/example.txt'); // 替换为你的文件路径
  const filename = 'example1.txt'; // 替换为你的文件名
  // 设置 Content-Type
  // res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Type', 'text/plain');
  // 设置 Content-Disposition (可选)
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  // 设置文件长度
  res.setHeader('Content-Length', (await fs.promises.stat(filePath)).size);
  // 流式传输返回
  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);
});

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
