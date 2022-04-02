import axios from 'axios'
import { BASE_URL } from './constants'

export const getExplore = async (page: number, limit: number) => {
  // Get request
  const exploreData = await axios.get(`${BASE_URL}/explore?page=${page}&limit=${limit}`).then(({data}) => {
    return data
  })
  return exploreData
}