import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createVote, addVoteTo } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  anecdotes.sort((a, b) => a.votes - b.votes).reverse()
  const dispatch = useDispatch()

  const addVote = (event) => {
    event.preventDefault()
    const content = event.target.vote.value
    dispatch(createVote(content))
  }

  const vote = (id) => {
    console.log('vote', id)
    dispatch(addVoteTo(id))
  }


  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addVote}>
        <div><input name='vote'/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App