import { createDirectory } from '../src/fs'

describe('createDirectory', () => {
  it('should create a directory', () => {
    createDirectory('./test/1')
  })
})
