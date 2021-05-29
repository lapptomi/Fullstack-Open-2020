import { gql } from '@apollo/client'

export const GET_ALL_AUTHORS = gql`
  query {
    allAuthors  {
      id
      name
      born
      bookCount
    }
  }
`

export const GET_ALL_BOOKS = gql`
  query allBooks($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre)  {
      id
      title
      published
      author {
        name
        born
      }
      genres
    }
  }
`

export const CREATE_NEW_BOOK = gql`
  mutation addBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      id
      title
      published
      author {
        name
        born
      }
      genres
    }
  }
`

export const EDIT_BIRTHYEAR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      id
      name
      born
      bookCount
    }
  }
`

export const LOG_IN = gql`
  mutation login($username: String!, $password: String!) {
    login(
      username: $username,
      password: $password
    ) {
      value
    }
  }
`;