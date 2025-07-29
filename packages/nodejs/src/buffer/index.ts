import { Buffer } from 'node:buffer'

const buffer = Buffer.alloc(10)
const buffer2 = Buffer.from('hello')

console.log(buffer)
console.log(buffer2)
