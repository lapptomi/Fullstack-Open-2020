import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote, } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleButtonClick = (event) => {
    event.preventDefault()
    
    const content = event.target.vote.value
    event.target.vote.value = ''

    dispatch(createAnecdote(content))
    dispatch(setNotification(`You created new anecdote: ${content}`, 3))
  }


  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleButtonClick}>
        <div><input name='vote'/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}


export default AnecdoteForm