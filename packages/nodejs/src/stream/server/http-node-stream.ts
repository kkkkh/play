import http from 'node:http';
import fs from 'node:fs';
import { createDirectory } from '../../fs';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';


export async function saveFileByHttpNodeStream(
    outputPath: string,
    fileName: string,
): Promise<void> {
    try {
        createDirectory(outputPath)
        const filePath = path.join(outputPath, fileName);
        const url = new URL('http://localhost:3000/getFileByNodeStream?version=1.0.4-all'); 
        http.get(url, async (res) => {
            res.on('error', (err) => {
                console.log('error', err);
            });
            const file = fs.createWriteStream(filePath);
            file.on('error', (err) => {
                console.log('error', err);
            });
            file.on('finish', () => {
                file.close();
            });
            res.pipe(file);
            // 更建议
            // await pipeline(res, file);
        }).on('error', (err) => {
            console.error('Error during download:', err);
        });
    } catch (error) {
        console.error('Error during download:', error);
    }
}



