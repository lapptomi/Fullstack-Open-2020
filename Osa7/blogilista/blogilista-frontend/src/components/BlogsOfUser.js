import React from 'react'


const BlogsOfUser = ({ user }) => {
  if (!user) {
    return null
  }
  return (
    <div>
      <h1>{user.name}</h1>
      <b>added blogs</b>
      <ul>
        {user.blogs.map((blog, i) =>
          <li key={i}>{blog.title}</li>
        )}
      </ul>
    </div>
  )
}

export default BlogsOfUser