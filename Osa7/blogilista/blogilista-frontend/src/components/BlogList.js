import React from 'react'
import Blog from '../components/Blog'
import { useSelector } from 'react-redux'


const BlogList = () => {
  const blogs = useSelector(state =>
    state.blogs.sort((a, b) => a.likes - b.likes).reverse()
  )

  return (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog}/>
      )}
    </div>
  )
}

export default BlogList