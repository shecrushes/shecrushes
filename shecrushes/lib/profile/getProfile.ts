import axios from 'axios'
import {BASE_URL} from '../constants'

export const getProfile = async (
    username: string, 
    page: number, 
    limit: number
) => {
  // Return user profile data
  const userData = await axios.get(`${BASE_URL}/user/${username}?page=${page}&limit=${limit}`)
    .then(({data}) => {
        return data
    })
  return userData
}