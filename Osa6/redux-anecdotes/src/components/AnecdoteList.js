import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVoteTo } from '../reducers/anecdoteReducer'
import { hideTempNotification, voteAddedNotification } from '../reducers/notificationReducer'


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
  
  const vote = (id) => {
    console.log('vote', id)
    dispatch(addVoteTo(id))
  }

  const setTempNotification = (anecdote) => {
    dispatch(voteAddedNotification(anecdote))
    setTimeout(() => {
      dispatch(hideTempNotification())
    }, 5000)
  }

  const handleClick = (anecdote) => {
    vote(anecdote.id)
    setTempNotification(`You voted: ${anecdote.content}`)
  }
  

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
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