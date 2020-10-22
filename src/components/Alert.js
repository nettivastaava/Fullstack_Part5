import React from 'react'
import PropTypes from 'prop-types'

const Alert = ({ message }) => {
  if (message === '') {
    return null
  } else if (message.match('^wrong')) {
    return <div className='failNot'>{message}</div>
  } else if (message.match('a new')) {
    return <div className='succNot'>{message}</div>
  }
}

Alert.propTypes = {
  message: PropTypes.string.isRequired
}

export default Alert