import React from 'react'

const Notification = ({ notification }) => {
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