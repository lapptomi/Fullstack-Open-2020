import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'


const BlogForm = ({ hideFormOnSubmit }) => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    try {
      dispatch(createBlog({ title, author, url }))
      hideFormOnSubmit()
      dispatch(setNotification('success', `a new blog ${title} by ${author} added`))

      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (error) {
      dispatch(setNotification('error', 'Error adding blog'))
    }
  }

  return (
    <div>
      <h1>Create new</h1>
      <form onSubmit={addBlog}>
        <div>
        title:
          <input
            id='title'
            type="text"
            value={title}
            name="blogTitle"
            onChange={handleTitleChange}
          />
        </div>

        <div>
        author:
          <input
            id='author'
            type="text"
            value={author}
            name="blogAuthor"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
        url:
          <input
            id='url'
            type="text"
            value={url}
            name="blogUrl"
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}


export default BlogForm