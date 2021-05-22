
export const setNotification = (notification, time) => {
  const seconds = time*1000
  
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        content: notification
      }
    })
    setTimeout(() => {
      dispatch(hideTempNotification())
    }, seconds)
  }
}

export const hideTempNotification = () => {
  return {
    type: 'HIDE_NOTIFICATION'
  }
}


const reducer = (state = '', action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      return action.data.content
    case 'HIDE_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export default reducer