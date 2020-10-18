import React from 'react'
import { useDispatch } from 'react-redux'
import { userLogout } from '../reducers/userReducer'

const LogoutButton = () => {
  const dispatch = useDispatch()
  return (
    <>
      <button onClick={() => dispatch(userLogout())}>
        logout
      </button>
    </>
  )
}

export default LogoutButton