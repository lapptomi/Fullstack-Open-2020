import React from 'react'
import { useDispatch } from 'react-redux'
import { addLikeTo } from '../reducers/blogReducer'


const Blog = ({ blog, users }) => {
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

  return (
    <div >
      <h1>{blog.title} {blog.author}</h1>
      <a href={`http://${blog.url}`}>{blog.url}</a>
      <p>
        {blog.likes} likes
        <button onClick={() => addLike(blog)}>like</button>
      </p>
      <p>added by {user.name}</p>
      <b>comments</b>
      <ul>
        {blog.comments.map((blog, i) =>
          <li key={i}>{blog.comment}</li>
        )}
      </ul>
    </div>
  )}


export default Blog
