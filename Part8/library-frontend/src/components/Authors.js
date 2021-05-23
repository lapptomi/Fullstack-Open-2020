import { useMutation, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { EDIT_BIRTHYEAR, GET_ALL_AUTHORS } from '../queries'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn]= useState('')

  const { loading, data } = useQuery(GET_ALL_AUTHORS, {
    pollInterval: 2000
  })
  
  const [changeBirthYear] = useMutation(EDIT_BIRTHYEAR)

  if (!props.show) {
    return null
  }
  if (loading) {
    return <h1>Loading...</h1>
  }

  const authors = data.allAuthors


  const handleSubmit = (event) => {
    event.preventDefault();
    setName('')
    setBorn('')
    changeBirthYear({ variables: { name: name, setBornTo: Number(born) } })
  }

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

      <h1>Set birthyear</h1>
        <form onSubmit={handleSubmit}>
        <p>
          name:
          <input 
            value={name} 
            onChange={(event) => setName(event.target.value)}
          />
        </p>
        <p>
          born:
          <input 
            value={born} 
            type="number"
            onChange={(event) => setBorn(event.target.value)}
          />
        </p>
        <button type="submit">update author</button>
        </form>
    </div>
  )
}

export default Authors