import React from 'react'

const Notification = ({operation, message}) => {
  if (operation === null) return null
  
  return (
    <div className={operation}>
      {message}
    </div>
  )
}

export default Notification