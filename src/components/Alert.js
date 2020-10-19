import React from 'react'

const Alert = ({message}) => {
    if (message === '') {
        return null
      } else if (message.match('^wrong')) {
        return <div className='failNot'>{message}</div>
      } else if (message.match('a new')) {
          return <div className='succNot'>{message}</div>
      }
}

export default Alert