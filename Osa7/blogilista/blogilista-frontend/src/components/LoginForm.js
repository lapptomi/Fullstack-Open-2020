import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { userLogin } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import loginService from '../services/login'


const LoginForm = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      dispatch(userLogin(user))
    } catch (exeption) {
      dispatch(setNotification('error', 'Wrong username or password'))
    }
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
        username
          <input
            id='username'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
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



export default LoginForm