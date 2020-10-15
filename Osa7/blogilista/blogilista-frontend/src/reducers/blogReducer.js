import blogService from '../services/blogs'


export const createBlog = (content) => {
  if (!(content.title && content.url && content.author)) {
    return null
  }
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}


const reducer = (state = [], action) => {
  console.log(action.type)
  switch(action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'NEW_BLOG':
    return [...state, action.data]
  default:
    return state
  }
}

export default reducer