import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector(state =>
    state.blogs.sort((a, b) => a.likes - b.likes).reverse()
  )

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'outset',
    borderWidth: 2,
    mariginBottom: 5,
    background: 'rgba(76, 175, 80, 0.20)',
  }

  return (
    <div>
      {blogs.map((blog, i) =>
        <p key={i} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </p>
      )}
    </div>
  )
}

export default BlogList