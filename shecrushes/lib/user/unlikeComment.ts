import axios from 'axios'
import {BASE_URL} from '../constants'

export const unlikeComment = async (commentId: number, userToken: string) => {
  const unlikeCommentRes = await fetch(`${BASE_URL}/authenticated/unlikeComment`, {
    method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    credentials: 'include',
    body: JSON.stringify({ 
      "userToken" : userToken,
      "commentId" : commentId
    }),
  }).then((response) => {
    return response.json()
  })

  return unlikeCommentRes
}