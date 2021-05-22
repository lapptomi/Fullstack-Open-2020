import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const handleTitleChange = (event) => {
    setBlogTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setBlogAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setBlogUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    })

    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }


  return (
    <>
      <form onSubmit={addBlog}>
        <div>
        title:
          <input
            id='title'
            type="text"
            value={blogTitle}
            name="blogTitle"
            onChange={handleTitleChange}
          />
        </div>

        <div>
        author:
          <input
            id='author'
            type="text"
            value={blogAuthor}
            name="blogAuthor"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
        url:
          <input
          id='url'
            type="text"
            value={blogUrl}
            name="blogUrl"
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}


export default BlogForm