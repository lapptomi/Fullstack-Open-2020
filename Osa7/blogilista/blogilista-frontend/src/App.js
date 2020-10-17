
import React, { useEffect, useRef, useState } from 'react'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs,  } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import UserList from './components/UserList'
import BlogsOfUser from './components/BlogsOfUser'
import axios from 'axios'
import Blog from './components/Blog'
import Menu from './components/Menu'

const App = () => {
  const dispatch = useDispatch()
  const blogRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
  }, [dispatch])

  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios
      .get('/api/users')
      .then(response => setUsers(response.data))
  }, [])


  const toggleVisibility = () => {
    blogRef.current.toggleVisibility()
  }

  const userMatch = useRouteMatch('/users/:id')
  const userFound = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const blogFound = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null


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
      <Menu />
      <Notification />
      <h2>blog app</h2>
      <Switch>
        <Route path={'/users/:id'}>
          <BlogsOfUser user={userFound}/>
        </Route>
        <Route path={'/blogs/:id'}>
          <Blog blog={blogFound} users={users} />
        </Route>
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