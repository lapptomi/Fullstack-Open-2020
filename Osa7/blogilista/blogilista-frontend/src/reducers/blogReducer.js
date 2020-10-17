import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'


export const addLikeTo = (blog) => {
  return async dispatch => {
    const result = await blogService.addLike(blog)
    dispatch({
      type: 'LIKE_BLOG',
      data: result
    })
  }
}

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

export const deleteBlog = (blog) => {
  const id = blog.id
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: { id }
    })
    dispatch(setNotification('success',
      `blog ${blog.title} by ${blog.author} deleted`)
    )
  }
}


const reducer = (state = [], action) => {
  console.log(action.type)
  switch(action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'DELETE_BLOG':
    return [...state].filter(b => b.id !== action.data.id)
  case 'LIKE_BLOG':
    return [...state]
  default:
    return state
  }
}

export default reducer