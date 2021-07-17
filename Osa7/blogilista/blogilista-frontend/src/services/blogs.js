import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const addLike = async (blog) => {
  blog.likes+=1
  const request = await axios.put(`${baseUrl}/${blog.id}`, blog)
  return request.data
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addComment = async (comment, id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(
    `${baseUrl}/${id}/comments`, comment, config
  )
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, setToken, create, addLike, remove, addComment }