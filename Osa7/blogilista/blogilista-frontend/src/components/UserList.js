import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
`

const StyledTd = styled.th`
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`

const UserList = () => {
  const blogs = useSelector(state => state.blogs)
  const users = blogs.map(blog => blog.user.name)
  const uniqueUsers = [...new Set(users)]

  const blogCount = (name) => {
    const userBlogs = blogs.filter(blog =>
      blog.user.name === name
    )
    return userBlogs.length
  }

  const getId = (name) => {
    const blog = blogs.find(b => b.user.name === name)
    return blog.user.id
  }

  return (
    <div>
      <h1>Users</h1>
      <StyledTable>
        <tbody>
          <tr>
            <th></th>
            <StyledTd>blogs created</StyledTd>
          </tr>
          {uniqueUsers.map((name, i) =>
            <tr key={i}>
              <StyledTd><Link to={`/users/${getId(name)}`}>{name}</Link></StyledTd>
              <StyledTd>{blogCount(name)}</StyledTd>
            </tr>
          )}
        </tbody>
      </StyledTable>
    </div>
  )
}

export default UserList