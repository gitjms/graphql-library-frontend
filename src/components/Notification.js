import React from 'react'

export const Notify = ({ message }) => {
  if ( !message ) {
    return null
  }

  const messageStyle = {
    color: 'green',
    background: 'lightgray',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    marginBottom: 10
  }

  return (
    <div style={messageStyle}>
      {message}
    </div>
  )
}

export const NotifyError = ({ message }) => {
  if ( !message ) {
    return null
  }

  const errorMessageStyle = {
    color: 'rgb(255, 0, 0)',
    background: 'lightgray',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    marginBottom: 10
  }

  return (
    <div style={errorMessageStyle}>
      {message}
    </div>
  )
}
