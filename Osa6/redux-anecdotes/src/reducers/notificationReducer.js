
export const voteAddedNotification = (textToShow) => {
  return {
    type: 'VOTE_ADDED_NOTIFICATION',
    data: {
      content: textToShow
    }
  }
}

export const voteCreatedNotification = (textToShow) => {
  return {
    type: 'VOTE_CREATED_NOTIFICATION',
    data: {
      content: textToShow
    }
  }
}

export const hideTempNotification = () => {
  return {
    type: 'HIDE_TEMP_NOTIFICATION'
  }
}


const reducer = (state = '', action) => {
  switch(action.type) {
    case 'VOTE_ADDED_NOTIFICATION':
      return action.data.content
    case 'VOTE_CREATED_NOTIFICATION':
      return action.data.content
    case 'HIDE_TEMP_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export default reducer