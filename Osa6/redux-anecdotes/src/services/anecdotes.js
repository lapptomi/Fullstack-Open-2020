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

const updateLikes = async (id) => {
  const anecdotes = await getAll()
  const anecdote = anecdotes.find(a => a.id === id)
  anecdote.votes+=1

  const request = await axios.put(`${baseUlr}/${id}`, anecdote)
  return request.data
}

export default { getAll, createNew, updateLikes }