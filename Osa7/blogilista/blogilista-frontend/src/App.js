
import React, { useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs,  } from './reducers/blogReducer'
import { initializeUser, userLogout } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const blogRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
  }, [dispatch])

  const user = useSelector(state => state.user)

  const toggleVisibility = () => {
    blogRef.current.toggleVisibility()
  }

  if (user === null) {
    return (
      <>
        <Notification />
        <LoginForm />
      </>
    )
  }

  return (
    <div>
      <Notification />
      <h2>blogs</h2>
      <p>
        {user.name} logged in
        <button onClick={() => dispatch(userLogout())}>
          logout
        </button>
      </p>
      <Togglable buttonLabel="Create new blog" ref={blogRef}>
        <h1>Create new</h1>
        <BlogForm hideFormOnSubmit={toggleVisibility} />
      </Togglable>
      <BlogList />
    </div>
  )
}

export default App