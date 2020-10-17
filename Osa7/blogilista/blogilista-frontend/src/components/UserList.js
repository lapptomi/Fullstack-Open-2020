import React from 'react'
import { useSelector } from 'react-redux'


const UserList = () => {
  const blogs = useSelector(state => state.blogs)
  const users = blogs.map(blog => blog.user.name)
  const uniqueUsers = [... new Set(users)]

  const blogCount = (name) => {
    const userBlogs = blogs.filter(blog =>
      blog.user.name === name
    )
    return userBlogs.length
  }

  return (
    <div>
      <h1>Users</h1>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {uniqueUsers.map((name, i) =>
            <tr key={i}>
              <td width='100px'>{name}</td>
              <td>{blogCount(name)}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default UserList