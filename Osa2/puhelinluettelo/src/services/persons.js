import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = (personObject) => {
  return axios.post(baseUrl, personObject)
}

const update = (id, personObect) => {
  return axios.put(`${baseUrl}/${id}`, personObect)
}

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

 
export default {
  getAll: getAll,
  create: create,
  update: update,
  remove: remove,
}