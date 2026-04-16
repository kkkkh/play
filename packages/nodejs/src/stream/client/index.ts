import path from 'node:path'
import { saveFileByFetchManual,  } from './fetch-manal'
import { saveFileByFetchManualUpdate } from './fetch-manal-update'
import { saveFileByFetchNodeStream } from './fetch-node-stream'
import { saveFileByFetchWebStream } from './fetch-web-stream'
import { saveFileByHttpNodeStream } from './http-node-stream'
import { readToWrite, readToWriteByManual } from './read-to-write'
import { processFileStream as processFileStreamAxios } from './axios'
import axios from 'axios'
const filesPath = path.resolve(__dirname, './files/')

const getStreamByAxios = async () => {
  try {
  const response = await axios.get('http://localhost:3000/getFileByNodeStream', {
    responseType: 'stream'
  })
  processFileStreamAxios(response, filesPath, `temp.zip`)


} catch (error) {
  console.error('Error streaming data with Axios:', error);
}
}


const getStreamByFetch = async () => {
  const response = await fetch('http://localhost:3000/getFileByNodeStream?version=1.0.4-all',
    {
      headers: {
        'Content-Type': 'application/octet-stream'
      }
    }
  );
  // saveFileByFetchManual(response, filesPath, `1.0.4.zip`)
  // saveFileByFetchManualUpdate(response, filesPath, `1.0.4-all.zip`)
  // saveFileByFetchWebStream(response, filesPath, `1.0.4-all.zip`)
  saveFileByFetchNodeStream(response, filesPath, `1.0.4-all.zip`)
}

const getStreamByHttp = async () => {
  saveFileByHttpNodeStream(filesPath, `1.0.4-all.zip`)
}

const getStreamByReadle = async () => {
  // readToWrite()
  readToWriteByManual()
}

// getStreamByAxios()
// getStreamByFetch()
// getStreamByHttp()
getStreamByReadle()
