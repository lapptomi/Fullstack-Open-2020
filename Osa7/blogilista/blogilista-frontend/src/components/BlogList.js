import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'


const Blog = styled.p`
  padding: 10px;
  border: outset;
  borderWidth: 2;
  width: 300px;
  border-left: 6px solid darkgrey;
  background-color: rgba(76, 175, 80, 0.20);;
`

const BlogList = () => {
  const blogs = useSelector(state =>
    state.blogs.sort((a, b) => a.likes - b.likes).reverse()
  )

  return (
    <div>
      {blogs.map((blog, i) =>
        <Blog key={i}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </Blog>
      )}
    </div>
  )
}

export default BlogList