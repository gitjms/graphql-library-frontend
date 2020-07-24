import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      props.notifyError(error.graphQLErrors[0] ? error.graphQLErrors[0].message : error.message)
      if (!result.data) {
        window.alert(error.message)
      }
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      props.setToken(token)
      localStorage.setItem('library-user-token', token)
    }
  }, [result]) // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault()

    await login({ variables: { username, password } })
      
    props.setPage('authors')
  }

  const width = {
    width: '100px'
  }
  
  return (
    <div className='col-auto'>
      <br />
      <h2 data-toggle='tooltip' data-placement='top' title='sign in page' aria-label='sign in page'>
        sign in
      </h2>
      <form onSubmit={submit}>
        <div className='form-group'>
          <label style={width}>username:</label>
          <input autoFocus
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            data-toggle='tooltip' data-placement='top' title='set username' aria-label='set username'
          />
        </div>
        <div className='form-group'>
          <label style={width}>password:</label>
          <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            data-toggle='tooltip' data-placement='top' title='set password' aria-label='set password'
          />
        </div>
        <button className='btn btn-raised btn-primary mr-1' type='submit'
          data-toggle='tooltip' data-placement='top' title='login' aria-label='login'>
          login
        </button>
        <button className='btn btn-raised btn-primary' type='button' onClick={() => props.setPage('authors')}
          data-toggle='tooltip' data-placement='top' title='cancel' aria-label='cancel'>
          cancel
        </button>
      </form>
    </div>
  )
}

export default LoginForm
