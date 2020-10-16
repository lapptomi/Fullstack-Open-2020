import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification[0])
  if (!notification) {
    return null
  }
  return (
    <div className={notification.operation}>
      {notification.message}
    </div>
  )
}

export default Notification