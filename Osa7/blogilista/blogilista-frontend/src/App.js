
import React, { useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import LogoutButton from './components/LogoutButton'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs,  } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'
import {
  Switch, Route
} from 'react-router-dom'
import UserList from './components/UserList'

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
      <div>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <Notification />
      <h2>blogs</h2>
      <p>
        {user.name} logged in
        <LogoutButton />
      </p>
      <Switch>
        <Route path={'/users'}>
          <UserList />
        </Route>
        <Route path={'/'}>
          <Togglable buttonLabel="Create new blog" ref={blogRef}>
            <BlogForm hideFormOnSubmit={toggleVisibility} />
          </Togglable>
          <BlogList />
        </Route>
      </Switch>
    </div>
  )
}


export default App