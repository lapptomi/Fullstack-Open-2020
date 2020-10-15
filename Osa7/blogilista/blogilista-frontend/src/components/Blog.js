import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addLikeTo, deleteBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  const [visible, setVisible] = useState(false)

  const handleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'outset',
    borderWidth: 2,
    mariginBottom: 5,
    background: 'rgba(76, 175, 80, 0.20)',
  }

  const addLike = (blog) => {
    try {
      dispatch(addLikeTo(blog))
    } catch (error) {
      console.log(error)
    }
  }

  const handleBlogDelete = (blog) => {
    try {
      if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
        dispatch(deleteBlog(blog))
      }
    } catch (error) {
      console.log(error)
    }
  }

  if (visible) {
    return (
      <div style={blogStyle} >
        <div> {blog.title}
          <button onClick={handleVisibility}>
            hide
          </button>
        </div>
        <p>{blog.url}</p>
        <div>
          likes {blog.likes}
          <button onClick={() => addLike(blog)}>
            like
          </button>
        </div>
        <p>{blog.author}</p>
        <button onClick={() => handleBlogDelete(blog)}>
          remove
        </button>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={handleVisibility}>
        view
      </button>
    </div>
  )}


export default Blog
