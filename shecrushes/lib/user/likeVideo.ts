import axios from 'axios'
import {BASE_URL} from '../constants'

export const likeVideo = async (videoId: string, userToken: string, username: string) => {

  const likeVideoRes = await fetch(`${BASE_URL}/authenticated/like`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ 
      "userToken" : userToken,
      "videoId" : videoId,
      "username": username
    }),
  }).then((response) => {
    return response.json()
  })

  return likeVideoRes
}