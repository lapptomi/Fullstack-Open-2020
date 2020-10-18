import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { userLogin } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import loginService from '../services/login'
import styled from 'styled-components'



const Title = styled.h2`
  color: black;
  font-family: Arial, Helvetica, sans-serif;
`
const Button = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100px;
`

const Input = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
`

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
      <Title>Log in to application</Title>
      <form onSubmit={handleLogin}>
        <div>
        username
          <Input
            id='username'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <Input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button type="submit">Login</Button>
      </form>
    </div>
  )
}



export default LoginForm