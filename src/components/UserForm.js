import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { SIGNUP } from '../queries'

const UserForm = (props) => {
  const [username, setUsername] = useState('')
  const [favoriteGenre, setFavGenre] = useState('')
  const [password, setPassword] = useState('')

  const [ createUser, result ] = useMutation(SIGNUP, {
    onError: (error) => {
      props.notifyError(error.graphQLErrors[0] ? error.graphQLErrors[0].message : error.message)
      if (!result.data) {
        window.alert(error.message)
      }
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.createUser.value
      props.setToken(token)
      localStorage.setItem('library-user-token', token)
    }
  }, [result]) // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault()

    await createUser({
      variables: {
        username,
        favoriteGenre,
        password
      }
    })

    props.setPage('authors')
  }

  const width = {
    width: '100px'
  }

  return (
    <div className='col-auto'>
      <br />
      <h2 data-toggle='tooltip' data-placement='top' title='create account page' aria-label='create account page'>
        create account
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
          <label style={width}>favorite genre:</label>
          <input
            value={favoriteGenre}
            onChange={({ target }) => setFavGenre(target.value)}
            data-toggle='tooltip' data-placement='top' title='set favorite genre' aria-label='set favorite genre'
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
          data-toggle='tooltip' data-placement='top' title='submit' aria-label='submit'>
          submit
        </button>
        <button className='btn btn-raised btn-primary' type='button' onClick={() => props.setPage('authors')}
          data-toggle='tooltip' data-placement='top' title='cancel' aria-label='cancel'>
          cancel
        </button>
      </form>
    </div>
  )
}

export default UserForm
