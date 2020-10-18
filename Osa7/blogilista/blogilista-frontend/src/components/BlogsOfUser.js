import React from 'react'
import styled from 'styled-components'

const Blog = styled.p`
  padding: 10px;
  border: outset;
  borderWidth: 2;
  width: 300px;
  border-left: 6px solid darkgrey;
  background-color: rgba(76, 175, 80, 0.20);;
`

const BlogsOfUser = ({ user }) => {
  if (!user) {
    return null
  }
  return (
    <div>
      <h1>{user.name}</h1>
      <b>added blogs</b>
      {user.blogs.map((blog, i) =>
        <Blog key={i}>{blog.title}</Blog>
      )}
    </div>
  )
}

export default BlogsOfUser