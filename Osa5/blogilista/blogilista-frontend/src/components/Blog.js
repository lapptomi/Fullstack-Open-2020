import React, { useState } from 'react'

const Blog = ({blog, handleLikeButtonClick}) => {
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

  const addLike = (event) => {
    handleLikeButtonClick({blog: blog})
  }


  if (visible) {
    return (
      <div style={blogStyle}>
        <div> {blog.title}
          <button onClick={handleVisibility}>
            hide
          </button>
        </div>
        <p>{blog.url}</p>
        <div> 
          likes {blog.likes}
          <button onClick={addLike}>
            like
          </button>
        </div>
        <p>{blog.author}</p>
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
