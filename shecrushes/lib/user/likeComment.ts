import {BASE_URL} from '../constants'

export const likeComment = async (commentId: number, userToken: string, username: string) => {

  const likeCommentRes = await fetch(`${BASE_URL}/authenticated/likeComment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ 
      "userToken" : userToken,
      "commentId" : commentId,
      "username": username
    }),
  }).then((response) => {
    return response.json()
  })

  return likeCommentRes
}