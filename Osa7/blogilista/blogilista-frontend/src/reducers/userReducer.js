import blogService from '../services/blogs'

export const userLogin = (user) => {
  return async (dispatch) => {
    const loggedUser = JSON.stringify(user)
    window.localStorage.setItem('loggedUser', loggedUser)
    blogService.setToken(user.token)
    dispatch({
      type: 'USER_LOGIN',
      data: user
    })
  }
}

export const userLogout = () => {
  return async (dispatch) => {
    window.localStorage.clear()
    dispatch({
      type: 'USER_LOGOUT',
    })
  }
}

export const initializeUser = () => {
  const loggedUser = window.localStorage.getItem('loggedUser')
  const user = loggedUser !== undefined
    ? JSON.parse(loggedUser)
    : null
  if (user !== null) {
    blogService.setToken(user.token)
  }
  return async (dispatch) => {
    dispatch({
      type: 'INIT_USER',
      data: user
    })
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'USER_LOGIN':
    return action.data
  case 'USER_LOGOUT':
    return null
  case 'INIT_USER':
    return action.data
  default:
    return state
  }
}

export default reducer