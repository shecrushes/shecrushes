import axios from 'axios'
import {BASE_URL} from '../constants'

export const getReplies = async (commentId: number, page: number, limit: number) => {
  // Get replies
  const replies = await axios.get(`${BASE_URL}/replies?commentId=${commentId}&page=${page}&limit=${limit}`).then(({data}) => {
    return data
  })
  return replies
}