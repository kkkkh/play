import path from 'node:path';
import {createDirectory, createFile, readDirectory} from './index';



export const main = async  () => {
    const dirPath = path.resolve(__dirname, './files')
    await createDirectory(dirPath);
    await createFile(path.resolve(dirPath, '1.txt'))
    await createFile(path.resolve(dirPath, '2.txt'))
    const files = await readDirectory(dirPath) // ['1.txt']
    console.log(files)
}
  
  
main()


