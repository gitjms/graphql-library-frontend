import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS } from '../queries'

const BookForm = (props) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [ addBook ] = useMutation(ADD_BOOK, {
    onError: (error) => {
      props.notifyError(error.graphQLErrors[0] ? error.graphQLErrors[0].message : error.message)
    },
    update: (store, response) => {
      props.updateBookCacheWith(response.data.addBook)
    },
    refetchQueries: [ { query: ALL_BOOKS }, { query: ALL_AUTHORS } ]
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    await addBook({ variables: { title,author,published: Number(published),genres } })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    if (genre !== '') {
      setGenres(genres.concat(genre))
      setGenre('')
    }
  }

  const width = {
    width: '100px'
  }

  const fontStyle = {
    fontFamily: 'Verdana, Geneva, Tahoma, sans-serif'
  }

  return (
    <div className='col-auto'>
      <br />
      <h2 data-toggle='tooltip' data-placement='top' title='add book page' aria-label='add book page'>
        add book
      </h2>
      <br />
      <form onSubmit={submit}>
        <div className='form-group'>
          <label style={width}>title:</label>
          <input autoFocus
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            data-toggle='tooltip' data-placement='top' title='set title' aria-label='set title'
          />
        </div>
        <div className='form-group'>
          <label style={width}>author:</label>
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            data-toggle='tooltip' data-placement='top' title='set author' aria-label='set author'
          />
        </div>
        <div className='form-group'>
          <label style={width}>published:</label>
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
            data-toggle='tooltip' data-placement='top' title='set published' aria-label='set published'
          />
        </div>
        <div className='form-group'>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
            data-toggle='tooltip' data-placement='top' title='set genre' aria-label='set genre'
          />
          <button className='btn btn-raised btn-primary ml-2' onClick={addGenre} type="button"
            data-toggle='tooltip' data-placement='top' title='add genre' aria-label='add genre'>
            add genre
          </button>
        </div>
        <div style={fontStyle}>
          genres: {genres.join(' ')}
        </div>
        <button className='btn btn-raised btn-primary' type='submit'
          data-toggle='tooltip' data-placement='top' title='submit' aria-label='submit'>
          submit
        </button>
      </form>
    </div>
  )
}

export default BookForm
