import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const styleIsVisible = notification !== ''
    ? style
    : { display: 'none' }

  return (
    <div style={styleIsVisible}>
      {notification}
    </div>
  )
}

export default Notification