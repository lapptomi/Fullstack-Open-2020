import React from 'react'

const BlogForm = (props) => {
  return (
    <>
      <form onSubmit={props.handleSubmitBlog}>
        <div>
        title:
          <input
            type="text"
            value={props.blogTitle}
            name="blogTitle"
            onChange={props.handleTitleChange}
          />
        </div>

        <div>
        author:
          <input
            type="text"
            value={props.blogAuthor}
            name="blogAuthor"
            onChange={props.handleAuthorChange}
          />
        </div>
        <div>
        url:
          <input
            type="text"
            value={props.blogUrl}
            name="blogUrl"
            onChange={props.handleUrlChange}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </>
  )
}


export default BlogForm