import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import LogoutButton from './LogoutButton'
import styled from 'styled-components'


const LoggedUser = styled.b`
    padding: 10px;
    font: 
  `
const StyledMenu = styled.div`
  list-style-type: none;
  background-color: #333;
  borderWidth: 2;
  display: block;
  color: white;
  text-align: left;
  padding: 14px 16px;
`
const StyledLink = styled(Link)`
  padding: 10px;
  color: white;
`

const Menu = () => {
  const loggedUser = useSelector(state => state.user)

  return (
    <StyledMenu >
      <StyledLink to="/blogs" >blogs</StyledLink>
      <StyledLink to="/users">users</StyledLink>
      <LoggedUser>{loggedUser.name} logged in</LoggedUser>
      <LogoutButton />
    </StyledMenu>
  )
}


export default Menu