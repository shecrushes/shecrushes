import axios from 'axios'
import {BASE_URL} from './constants'

export const getCategory = async (category: string, page: number, limit: number) => {
  // Turn category into lower case
  const categoryLower = category.toLowerCase()

  // Get request
  const categoryData = await axios.get(`${BASE_URL}/category?key=${categoryLower}&page=${page}&limit=${limit}`).then(({data}) => {
    return data
  })
  return categoryData
}