import { createDirectory } from '../src/fs/index'

describe('createDirectory', () => {
  it('should create a directory', () => {
    createDirectory('./test/1')
  })
})
