
import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationOperation, setNotificationOperation] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState('')

  const blogRef = useRef()

  useEffect(() => {
    const fetchBlogs = async () => {
      const result = await blogService.getAll()
      setBlogs(result)
    }
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showTempNotification = (operation, message) => {
    setNotificationOperation(operation)
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationOperation(null)
      setNotificationMessage('')
    }, 3000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exeption) {
      showTempNotification('loginError', 'Wrong username or password')
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const addBlog = async (newBlogObject) => {
    const title = newBlogObject.title
    const author = newBlogObject.author
    
    try {
      const newBlog = await blogService.create(newBlogObject)
      setBlogs(blogs.concat(newBlog))
      blogRef.current.toggleVisibility()
      showTempNotification('blogAdded', `a new blog ${title} by ${author} added`)
    } catch (error) {
      showTempNotification('error', 'Error adding blog')
    }
  }



  if (user === null) {
    return (
      <div>
        <Notification
          operation={notificationOperation}
          message={notificationMessage}
        />
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
          </div>
          <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <Notification
        operation={notificationOperation}
        message={notificationMessage}
      />
      <h2>blogs</h2>
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>
          logout
        </button>
      </p>
      <Togglable buttonLabel="new blog" ref={blogRef}>
        <h1>create new</h1>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App