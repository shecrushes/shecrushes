import axios from 'axios'
import {BASE_URL} from './constants'

export const getRelatedVideos = async (tag: string) => {
  const relatedVideos = await axios.get(`${BASE_URL}/video/relatedVideos?tag=${tag}`)
  .then(({data}) => {
    return data
  })
  return relatedVideos
}