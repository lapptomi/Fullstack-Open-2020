import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import LogoutButton from './LogoutButton'


const Menu = () => {
  const loggedUser = useSelector(state => state.user)

  const padding = {
    paddingTop: 10,
    padding: 10,
    width: '100%',
    paddingLeft: 2,
    borderWidth: 2,
    background: 'lightgrey',
  }
  return (
    <div style={padding}>
      <Link style={padding} to="/blogs" >blogs</Link>
      <Link style={padding} to="/users">users</Link>
      <b>{loggedUser.name} logged in</b>
      <LogoutButton />
    </div>
  )
}

export default Menu