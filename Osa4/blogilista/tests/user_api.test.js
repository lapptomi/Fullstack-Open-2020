const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

users = [
  {
    username: "testuser1",
    name: "name1",
    password: "password",
  },
  {
    username: "testuser2",
    name: "name2",
    password: "12",
  },
  {
    name: "testuser3",
    password: "123",
  }
]

beforeEach(async () => {
  await User.deleteMany({})
})


test('Users with unvalid values are not added to DB', async () => {
  await api
    .post('/api/users')
    .send(users[0])
    .expect(200)

  await api
    .post('/api/users')
    .send(users[1])
    .expect(400)

  await api
    .post('/api/users')
    .send(users[2])
    .expect(400)
    
  await api
    .post('/api/users')
    .send(users[0])
    .expect(400)
})


afterAll(() => {
  mongoose.connection.close()
})