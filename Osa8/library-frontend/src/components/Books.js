
import { useQuery } from '@apollo/client';
import React, { useState } from 'react'
import Select from 'react-select';
import { GET_ALL_BOOKS } from '../queries';

const Books = (props) => {
  const [genre, setGenre] = useState('')

  const { loading, data } = useQuery(GET_ALL_BOOKS, {
    pollInterval: 5000
  });

  if (!props.show || !data) {
    return null
  }
  if (loading) {
    return <h1>Loading...</h1>
  }

  const books = data.allBooks

  const bookGenres = [...new Set(books.flatMap(({ genres }) => genres))]  
  const genreOptions = bookGenres.map((genre) => {
    return {
      value: genre,
      label: genre
    }
  })

  const booksByGenre = genre
    ? books.filter((book) => book.genres.includes(genre))
    : books
  
  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {booksByGenre.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <h2>Genre</h2>
        <Select
          defaultValue={null}
          onChange={({ value }) => setGenre(value)}
          options={[
            { label: 'all genres', value: null },
            ...genreOptions
          ]}
        />
      </div>
    </div>
  )
}

export default Books