import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_ALL_AUTHORS } from '../queries'

const Authors = (props) => {
  const { loading, data } = useQuery(GET_ALL_AUTHORS, {
    pollInterval: 2000
  });
  
  if (!props.show) {
    return null
  }
  if (loading) {
    return <h1>Loading...</h1>
  }

  const authors = data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  )
}

export default Authors