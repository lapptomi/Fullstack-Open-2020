const { useMutation } = require("@apollo/client");
const { useState } = require("react");
const { LOG_IN } = require("../queries");

const Login = ({ show }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login] = useMutation(LOG_IN);

  if (!show) {
    return null;
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
      .then((result) => {
        console.log(result)
        const token = result.data.login.value;
        window.localStorage.setItem('user-token', token);
        window.location.reload();
      })
      .catch((error) => {
        window.alert(error.message);
      });
  };

  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleSubmit}>
        <p>
          username: 
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </p>
        <p>
          password: 
          <input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </p>
        <button type="submit">Log in</button>
      </form>
    </div>
  )
}

export default Login;