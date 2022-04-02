import axios from 'axios'
import {BASE_URL} from '../constants'

export const getComments = async (videoId: string, page: number, limit: number) => {
  // Turn category into lower case
  const videoIdParse = videoId.toLowerCase()

  // Get request
  const comments = await axios.get(`${BASE_URL}/comments?videoId=${videoIdParse}&page=${page}&limit=${limit}`).then(({data}) => {
    return data
  })
  return comments
}