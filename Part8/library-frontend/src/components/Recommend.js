import { useQuery } from "@apollo/client";
import { GET_ALL_BOOKS, GET_CURRENT_USER } from "../queries";

const Recommend = ({ show }) => {
  const currentUserResult = useQuery(GET_CURRENT_USER);
  const booksResult = useQuery(GET_ALL_BOOKS, {
    pollInterval: 5000
  });

  if (!show || !currentUserResult.data || !booksResult.data) {
    return null
  }
  if (currentUserResult.loading || booksResult.loading) {
    return <h1>Loading...</h1>
  }

  const currentUser = currentUserResult.data.me
  const booksByGenre = currentUser.favoriteGenre
    ? booksResult.data.allBooks.filter((book) => book.genres.includes(currentUser.favoriteGenre))
    : booksResult.data.allBooks

  if (!currentUser.favoriteGenre) {
    return <h2>User does not have favorite genre</h2>
  }
  
  return (
    <div>
      <h1>Recommendations</h1>
      <p>books in your favorite genre <b>patterns</b></p>
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
    </div>
  )
}

export default Recommend;