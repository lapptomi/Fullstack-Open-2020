import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addLikeTo } from '../reducers/blogReducer'
import blogService from '../services/blogs'
import styled from 'styled-components'

const Button = styled.button`
  background-color: #4CAF50;
  margin-left: 5px;
  color: white;
  padding 4px;
  border: none;
  cursor: pointer;
  width: 100px;
  border-left: 2px solid black;
`

const Comment = styled.p`
  background-color: #399;
  color: white;
  text-align: left;
  border-bottom: 1px solid #ddd;
  padding: 4px;
  width: 150px;
  font-family: Arial, Helvetica, sans-serif;
`

const Blog = ({ blog, users }) => {
  const [comment, setComment] = useState('')
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

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  const addComment = () => {
    blogService.addComment({ comment }, blog.id)
  }

  return (
    <div >
      <h1>{blog.title} {blog.author}</h1>
      <a href={`http://${blog.url}`}>{blog.url}</a>
      <p>
        {blog.likes} likes
        <Button onClick={() => addLike(blog)}>like</Button>
      </p>
      <p>added by {user.name}</p>
      <form onSubmit={addComment}>
        <input
          type="text"
          value={comment}
          onChange={handleCommentChange}
        />
        <Button type="submit">add comment</Button>
      </form>
      <b>comments</b>
      {blog.comments.map((blog, i) =>
        <Comment key={i}>{blog.comment}</Comment>
      )}
    </div>
  )}


export default Blog
