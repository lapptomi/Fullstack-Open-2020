export const handleFilterChange = (filter) => {
  return {
    type: 'FILTER_CHANGE',
    data: {
      content: filter
    }
    
  }
}


const reducer = (state = '', action) => {
  switch(action.type) {
    case 'FILTER_CHANGE':
      const filter = action.data.content
      return filter
    default:
      return state
  }
}

export default reducer