
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)
  if (!blog.likes) blog.likes = 0
  if (!(blog.title && blog.url)) {
    return response.status(400).end()
  }
  
  blog.save().then(result => {
      response.status(201).json(result)
    })
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    return response.status(204).end()
  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {    
  const body = request.body
  const id = request.params.id

  try { 
    const blog = await Blog.findById(request.params.id)
    if (!blog) return response.status(404).end()

    const updatedBlog = {
      title: !body.title ? blog.title : body.title,
      author: !body.author ? blog.author : body.author,
      url: !body.url ? blog.url : body.url,
      likes: !body.likes ? blog.likes : body.likes,
    }
    
    await Blog.findByIdAndUpdate(id, updatedBlog, { new: true })
    response.json(updatedBlog)
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter