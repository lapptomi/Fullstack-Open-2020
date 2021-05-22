import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVoteTo } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={handleClick}>vote</button>
        </div>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  anecdotes.sort((a, b) => a.votes - b.votes).reverse()
  const dispatch = useDispatch()
  
  const addVote = (id) => {
    console.log('vote', id)
    dispatch(addVoteTo(id))
  }

  const handleClick = (anecdote) => {
    addVote(anecdote.id)
    dispatch(setNotification(`you voted '${anecdote.content}'`, 3))
  }
  
  const filter = useSelector(state => state.filter).toLowerCase()
  const filteredAnecdotes = anecdotes.filter(a => 
    a.content.toLowerCase().includes(filter)
  )
  

  return (
    <div>
      <h2>Anecdotes</h2>
      {filteredAnecdotes.map(anecdote =>
        <Anecdote 
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => handleClick(anecdote)}
        />
      )}
    </div>
  )
}

export default AnecdoteList