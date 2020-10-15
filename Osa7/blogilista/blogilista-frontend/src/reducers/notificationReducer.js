export const setNotification = (operation, message) => {
  return {
    type: 'SET_NOTIFICATION',
    data: { operation, message }
  }
}

export const hideNotification = () => {
  return {
    type: 'HIDE_NOTIFICATION'
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return state.concat(action.data)
  case 'HIDE_NOTIFICATION':
    return []
  default:
    return state
  }
}

export default reducer