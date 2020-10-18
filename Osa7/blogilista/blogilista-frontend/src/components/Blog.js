import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addLikeTo } from '../reducers/blogReducer'
import blogService from '../services/blogs'


const Blog = ({ blog, users }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  if (!blog) return null
  const user = users.find(user => user.id === blog.user.id)

  if (!user) {
    return null
  }

  const addLike = (blog) => {
    try {
      dispatch(addLikeTo(blog))
    } catch (error) {
      console.log(error)
    }
  }

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  const addComment = () => {
    blogService.addComment({ comment }, blog.id)
  }

  return (
    <div >
      <h1>{blog.title} {blog.author}</h1>
      <a href={`http://${blog.url}`}>{blog.url}</a>
      <p>
        {blog.likes} likes
        <button onClick={() => addLike(blog)}>like</button>
      </p>
      <p>added by {user.name}</p>
      <form onSubmit={addComment}>
        <input
          type="text"
          value={comment}
          onChange={handleCommentChange}
        />
        <button type="submit">add comment</button>
      </form>
      <b>comments</b>
      <ul>
        {blog.comments.map((blog, i) =>
          <li key={i}>{blog.comment}</li>
        )}
      </ul>
    </div>
  )}


export default Blog
