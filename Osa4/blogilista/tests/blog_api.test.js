const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

blogs = [
  {
    title: "TestTitle1",
    author: "TestAuthor1",
    url: "TestUrl1",
    likes: 1
  },
  {
    title: "TestTitle2",
    author: "TestAuthor2",
    url: "TestUrl2",
    likes: 2
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject1 = new Blog(blogs[0])
  await blogObject1.save()
  let blogObject2 = new Blog(blogs[1])
  await blogObject2.save()
})


describe('blogs from database', () => {
  test('are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  test('returns right amount of blogs', async () => {
    const response = await api.get('/api/blogs')
    const blogsLength = response.body.length
    expect(response.body).toHaveLength(2)
    expect(response.body).toHaveLength(blogsLength)
  })

  test('has identifier named id instead of _id', async () => {
    const response = await api.get('/api/blogs')
    response.body.map(blog => {
      expect(blog.id).toBeDefined()
      expect(blog._id).toBeUndefined()
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})