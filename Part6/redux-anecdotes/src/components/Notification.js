import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const styleIsVisible = props.notification !== ''
    ? style
    : { display: 'none' }

  return (
    <div style={styleIsVisible}>
      {props.notification}
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification