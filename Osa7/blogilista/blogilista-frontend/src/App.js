
import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { hideNotification, setNotification } from './reducers/notificationReducer'


const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification[0])

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const showTempNotification = (operation, message) => {
    dispatch(setNotification(operation, message))
    setTimeout(() => {
      dispatch(hideNotification())
    }, 3000)
  }

  const blogRef = useRef()

  useEffect(() => {
    const fetchBlogs = async () => {
      const result = await blogService.getAll()
      result.sort((a, b) => a.likes - b.likes).reverse()
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
      showTempNotification('error', 'Wrong username or password')
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

  const addLike = ({ blog }) => {
    try {
      blog.likes+=1
      blogService
        .addLike(blog)
        .then(() => {
          const updatedBlogs = [...blogs]
          updatedBlogs.sort((a, b) => a.likes - b.likes).reverse()
          setBlogs(updatedBlogs)
        })
    } catch (error) {
      console.log(error)
    }
  }

  const deleteBlog = ({ blog }) => {
    try {
      if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
        blogService
          .remove(blog.id)
          .then(() => {
            const updatedBlogs = blogs.filter(b => b.id !== blog.id)
            setBlogs(updatedBlogs)
          })
        showTempNotification('blogDeleted', `blog ${blog.title} by ${blog.author} deleted`)
      }
    } catch (error) {
      console.log(error)
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
          handleLikeButtonClick={addLike}
          handleBlogDelete={deleteBlog}
        />
      )}
    </div>
  )
}

export default App