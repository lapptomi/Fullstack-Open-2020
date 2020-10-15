
import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { createBlog, initializeBlogs,  } from './reducers/blogReducer'


const App = () => {
  const dispatch = useDispatch()
  const blogRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const notification = useSelector(state => state.notification[0])
  const blogs = useSelector(state =>
    state.blogs.sort((a, b) => a.likes - b.likes).reverse()
  )

  const [user, setUser] = useState(null)

  const showNotification = (operation, message) => {
    dispatch(setNotification(operation, message))
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (event) => {
    const username = event.target.username.value
    const password = event.target.password.value
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
    } catch (exeption) {
      showNotification('error', 'Wrong username or password')
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
      dispatch(createBlog(newBlogObject))
      blogRef.current.toggleVisibility()
      showNotification('success', `a new blog ${title} by ${author} added`)
    } catch (error) {
      showNotification('error', 'Error adding blog')
    }
  }

  if (user === null) {
    return (
      <>
        <Notification notification={notification} />
        <LoginForm handleLogin={handleLogin} />
      </>
    )
  }

  return (
    <div>
      <Notification notification={notification}/>
      <h2>blogs</h2>
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>
          logout
        </button>
      </p>
      <Togglable buttonLabel="Create new blog" ref={blogRef}>
        <h1>Create new</h1>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
        />
      )}
    </div>
  )
}

export default App