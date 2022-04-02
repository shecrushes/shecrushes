import axios from 'axios'
import {BASE_URL} from './constants'

export const getVideo = async (video_id: string) => {
  const videoData = await axios.get(`${BASE_URL}/video/${video_id}`)
  .then(({data}) => {
    return data
  })
  return videoData
}