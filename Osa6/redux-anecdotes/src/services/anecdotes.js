import axios from 'axios'

const baseUlr = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUlr)
  return response.data
}

const createNew = async (content) => {
  const getId = () => (100000 * Math.random()).toFixed(0)
  const object = { content: content, votes: 0, id: getId() }
  const response = await axios.post(baseUlr, object)
  return response.data
}

export default { getAll, createNew }