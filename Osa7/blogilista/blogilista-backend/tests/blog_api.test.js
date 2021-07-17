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
  test('are returned as JSON', async () => {
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

describe('blogs to database', () => {
  test('can be added with POST request', async () => {
    const response = await api.get('/api/blogs')
    const blogsLengthBefore = response.body.length

    const blogObject3 = {
      title: "TestTitle3",
      author: "TestAuthor3",
      url: "TestUrl3",
      likes: 1
    }

    await api
      .post('/api/blogs')
      .send(blogObject3)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const responseAfterPostRequest = await api.get('/api/blogs')
    const blogsLengthAfter = responseAfterPostRequest.body.length
    expect(blogsLengthBefore).toEqual(2)
    expect(blogsLengthBefore+1).toEqual(blogsLengthAfter)
  })

  test('without likes field is set to zero by default', async () => {
    const blogWithoutLikes = {
      title: "TestTitle4",
      author: "TestAuthor4",
      url: "TestUrl4",
    }

    await api
      .post('/api/blogs')
      .send(blogWithoutLikes)
      .expect(201)

    const addedBlog = await Blog.findOne({ title: "TestTitle4" })
    expect(addedBlog.likes).toEqual(0)
    expect(addedBlog.title).toBe('TestTitle4')
  })

  test('without title and / or url is not added', async() => {
    const unvalidBlog = {
      author: "TestAuthor5",
      likes: 5
    }
    const unvalidBlog2 = {
      author: "TestAuthor5",
      title: "TestTitle",
      likes: 5
    }
    const unvalidBlog3 = {
      author: "TestAuthor5",
      url: "TestUrl",
      likes: 5
    }

    await api
      .post('/api/blogs')
      .send(unvalidBlog)
      .expect(400)
    await api
      .post('/api/blogs')
      .send(unvalidBlog2)
      .expect(400)
    await api
      .post('/api/blogs')
      .send(unvalidBlog3)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})