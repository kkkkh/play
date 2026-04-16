import fs from 'node:fs';
import stream from 'node:stream';
import path from 'node:path';

export async function readToWrite() {
    const largeString = '********1111111111'; // 假设这是一个很大的 字符串
    const filePath = path.resolve(__dirname, './files/string.text');
    try {
        const stringStream = stream.Readable.from(largeString); // 将字符串转换为可读流
        const fileStream = fs.createWriteStream(filePath); // 创建可写流
        stringStream.pipe(fileStream);
        console.log('Finished writing to file');
    } catch (err) {
        console.error('Pipeline failed.', err);
    }
}

// 手动模拟 pipe 的写法
export async function readToWriteByManual() {
    
    const generateChunks = function*() {
        yield 'part1\n'
        yield 'part2\n'
        yield 'part3\n'
    }
    const filePath = path.resolve(__dirname, './files/generateChunks.text');
    
    const stringStream = stream.Readable.from(generateChunks()); 
    const fileStream = fs.createWriteStream(filePath); // 创建可写流
    
    let canWrite = true;
    
    stringStream.on('data', (chunk) => {
        canWrite = fileStream.write(chunk); 
        // 上游读太快，下游写不过来，于是暂停上游，等下游缓过来再继续。
        // 手动把“读取速度”控制到不超过“写入速度”。
        if (!canWrite) {
            stringStream.pause();
        }
    });
    
    fileStream.on('drain', () => {
        // 当缓冲区排空时，恢复可读流
        console.log('Drain!');
        canWrite = true;
        stringStream.resume();
    });
    
    stringStream.on('end', () => {
        // 当可读流读取完毕时，关闭可写流
        fileStream.end();
    });
    
    fileStream.on('finish', () => {
        console.log('Finished writing to file');
    });
    
    fileStream.on('error', (err) => {
        console.error('Error writing to file:', err);
    });

}