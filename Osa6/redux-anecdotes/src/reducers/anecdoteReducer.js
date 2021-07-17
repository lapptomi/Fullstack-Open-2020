import anecdoteService from '../services/anecdotes'


export const addVoteTo = (id) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.updateLikes(id)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}


export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}


const reducer = (state = [], action) => {
  console.log(action.type)
  const newState = [...state]

  switch(action.type) {
    case 'VOTE':
      const anecdote = newState.find(a => a.id === action.data.id)
      anecdote.votes+=1
      return newState
    case 'NEW_ANECDOTE':
        return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export default reducer