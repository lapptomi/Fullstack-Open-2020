
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({}).populate('user', {
    blogs: 0
  })
  response.json(blogs.map(b => b.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  try {
    jwt.verify(request.token, process.env.SECRET)
  } catch (error) {
    return response.status(401).send({
      error: 'invalid token'
    })
  }

  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return response.status(401).json({ 
      error: 'token missing or invalid' 
    })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog ({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user
  })

  if (!blog.likes) blog.likes = 0
  if (!(blog.title && blog.url)) {
    return response.status(400).end()
  }
  if (!blog.user) {
    return response.status(400).send({
      error: 'user not found'
    })
  }

  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog.toJSON())
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(request.params.id)

    if (user.id.toString() === blog.user.toString()) {
      await Blog.findByIdAndDelete(request.params.id)
      return response.status(204).end()
    }
    return response.status(401).end()
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
      id: body.id,
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