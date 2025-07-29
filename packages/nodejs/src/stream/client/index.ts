import path from 'node:path'
import { processFileStream as processFileStreamFetch, processFileStreamByPipe } from './fetch'
import { processFileStream as processFileStreamAxios } from './axios'
import axios from 'axios'
import fs from 'node:fs'

const getStreamByAxios = async () => {
  try {
  const response = await axios.get('http://localhost:3000/getLabFile', {
    responseType: 'stream'
  })
  const filesPath = path.resolve(__dirname, './files/axios/')
  processFileStreamAxios(response, filesPath, `temp.zip`)


} catch (error) {
  console.error('Error streaming data with Axios:', error);
}
}


const getStreamByFetch = async () => {
  const response = await fetch('http://localhost:3000/getLabFile');
  const filesPath = path.resolve(__dirname, './files/fetch/')
  processFileStreamByPipe(response, filesPath, `temp.zip`)
}

// getStreamByFetch()
getStreamByAxios()
