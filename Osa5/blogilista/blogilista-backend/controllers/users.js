const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    likes: 0, user: 0
  })
  response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response, next) => {
  const body = request.body

  const validPassword = body.password !== undefined
    ? body.password
    : false
  const validUsername = body.username !== undefined
    ? body.username
    : false

  
  if (!validPassword || !validUsername) {
    return response.status(400).send({
      error: 'invalid username or password'
    })
  }
  if (body.password.length < 3 || body.username.length < 3) {
    return response.status(400).send({
      error: 'password or username is too short'
    }) 
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  try {
    const savedUser = await user.save()
    response.json(savedUser)
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter
