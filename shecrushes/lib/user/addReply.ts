import axios from 'axios'
import {BASE_URL} from '../constants'

export const addReply = async (commentId: number, userToken: string, commentText: string) => {

  const addReplyRes = await fetch(`${BASE_URL}/authenticated/comments/reply`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ 
      "userToken" : userToken,
      "commentId" : commentId,
      "commentText": commentText
    }),
  }).then((response) => {
    return response.json()
  })

  return addReplyRes
}