import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (newBlogObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newBlogObject, config)
  return response.data
}

const addLike = (blogToUpdate) => {
  const blogId = blogToUpdate.id
  const response = axios.put(`${baseUrl}/${blogId}`, blogToUpdate)
  return response.then(response => response.data)
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, setToken, create, addLike, remove }