import axios from 'axios'
import {BASE_URL} from '../constants'

export const unlikeVideo = async (videoId: string, userToken: string) => {
  const unlikeVideoRes = await fetch(`${BASE_URL}/authenticated/unlike`, {
    method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    credentials: 'include',
    body: JSON.stringify({ 
      "userToken" : userToken,
      "videoId" : videoId
    }),
  }).then((response) => {
    return response.json()
  })

  return unlikeVideoRes
}