import React from 'react'

const LoginForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword
}) => {
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
            onChange={setUsername}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={setPassword}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}



export default LoginForm