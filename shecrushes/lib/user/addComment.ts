import axios from 'axios'
import {BASE_URL} from '../constants'

export const addComment = async (videoId: string, userToken: string, commentText: string) => {

  const addCommentRes = await fetch(`${BASE_URL}/authenticated/comments/addComment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ 
      "userToken" : userToken,
      "videoId" : videoId,
      "commentText": commentText
    }),
  }).then((response) => {
    return response.json()
  })

  return addCommentRes
}