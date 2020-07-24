import React, { useState, useEffect } from 'react'
import { useApolloClient, useQuery, useLazyQuery, useSubscription } from '@apollo/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faSignInAlt, faSignOutAlt, faUserPlus, faSpinner } from '@fortawesome/free-solid-svg-icons'
import Authors from './components/Authors'
import Books from './components/Books'
import BookForm from './components/BookForm'
import Footer from './components/Footer'
import { Notify, NotifyError } from './components/Notification'
import LoginForm from './components/LoginForm'
import UserForm from './components/UserForm'
import Recommended from './components/Recommended'
import { ALL_BOOKS, ALL_AUTHORS, FAVORITE_BOOKS, BOOK_ADDED, AUTHOR_EDITED, CURRENT_USER } from './queries'

const App = () => {

  const client = useApolloClient()
  const allAuthorsResult = useQuery(ALL_AUTHORS)
  const allBooksResult = useQuery(ALL_BOOKS)

  const [allAuthors, setAllAuthors] = useState([])
  const [allBooks, setAllBooks] = useState([])

  const [token, setToken] = useState(localStorage.getItem('library-user-token'))

  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState('authors')

  const [getFavoriteBooks, resultBooks] = useLazyQuery(FAVORITE_BOOKS) 
  const [favoriteBooks, setFavoriteBooks] = useState([])

  const [getUser, resultUser] = useLazyQuery(CURRENT_USER)
  const [favoriteGenre, setFavoriteGenre] = useState('')

  const [optedGenre, setGenre] = useState('all')
  const [bookUpdateCache, setBookupdateCache] = useState(null)
  const [authorUpdateCache, setAuthorupdateCache] = useState([])

  useEffect(() => {
    if (allAuthorsResult.data) {
      setAllAuthors(allAuthorsResult.data.allAuthors)
    }
  }, [allAuthorsResult])

  useEffect(() => {
    if (allBooksResult.data) {
      setAllBooks(allBooksResult.data.allBooks)
    }
  }, [allBooksResult])

  useEffect(() => {
    if (resultUser.data && resultUser.data.me) {
      setFavoriteGenre(resultUser.data.me.favoriteGenre)
    }
  }, [resultUser])

  useEffect(() => {
    if (resultBooks.data ) {
      setFavoriteBooks(resultBooks.data.favorites)
    }
  }, [resultBooks])

  const updateBookCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  const updateAuthorCacheWith = (editedAuthors) => {
    client.writeQuery({
      query: ALL_AUTHORS,
      data: { allAuthors : editedAuthors }
    })
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      updateBookCacheWith(addedBook)
      setBookupdateCache(addedBook)
      setAllBooks(allBooks.concat(addedBook))
      notify(`${addedBook.title} added`)
    }
  })

  useSubscription(AUTHOR_EDITED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const editedAuthor = subscriptionData.data.authorEdited
      updateAuthorCacheWith(editedAuthor)
      setAuthorupdateCache(editedAuthor)
      notify(`author birthyear edited`)
    }
  })

  const notify = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 10000)
  }

  const notifyError = (errorMessage) => {
    setErrorMessage(errorMessage)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setPage('authors')
    setToken(null)
    localStorage.clear()
    client.clearStore()
  }

  if (allAuthorsResult.loading || allBooksResult.loading || resultUser.loading || resultBooks.loading)  {
    return <div className='container'><br /><br /><br /><center>
      <FontAwesomeIcon icon={faSpinner} size='5x'/></center></div>
  }

  const padding = {
    paddingRight: '5px'
  }
  
  return (
    <>
      <nav id='nav' className='navbar navbar-light bg-light'>
        <a className="navbar-brand" href='/'
          data-toggle='tooltip' data-placement='top' title='Bloglist home' aria-label='Bloglist home'>
          <span style={padding}></span><FontAwesomeIcon icon={faHome}/><strong>Bloglist</strong></a>
        <div className='button-group'>
          <button className='btn btn-raised btn-warning mr-1' onClick={() => setPage('authors')}
            data-toggle='tooltip' data-placement='top' title='authors' aria-label='authors'>
            authors
          </button>
          <button className='btn btn-raised btn-warning mr-1' onClick={() => setPage('books')}
            data-toggle='tooltip' data-placement='top' title='books' aria-label='books'>
            books
          </button>
          {token &&
            <>
              <button className='btn btn-raised btn-warning mr-1' onClick={() => setPage('addBook')}
                data-toggle='tooltip' data-placement='top' title='add book' aria-label='add book'>
                add book
              </button>
              <button className='btn btn-raised btn-warning mr-1' onClick={() => {
                getUser()
                getFavoriteBooks()
                setPage('recommended')
              }}
              data-toggle='tooltip' data-placement='top' title='recommended' aria-label='recommended'>
                recommended
              </button>
            </>
          }
          {!token
            ? <><button className='btn btn-raised btn-primary mr-1' onClick={() => setPage('login')}
                data-toggle='tooltip' data-placement='top' title='sign in' aria-label='sign in'>
                sign in<span style={padding}></span><FontAwesomeIcon icon={faSignInAlt}/>
              </button>
              <button className='btn btn-raised btn-primary' onClick={() => setPage('createacc')}
                data-toggle='tooltip' data-placement='top' title='sign up' aria-label='sign up'>
                sign up<span style={padding}></span><FontAwesomeIcon icon={faUserPlus}/>
              </button></>
            : <button className='btn btn-raised btn-primary' onClick={logout}
                data-toggle='tooltip' data-placement='top' title='sign out' aria-label='sign out'>
                sign out<span style={padding}></span><FontAwesomeIcon icon={faSignOutAlt}/></button>
          }
        </div>
      </nav>

      <div className='container'>
      <Notify message={message} />
      <NotifyError errorMessage={errorMessage} />

      <Authors
        show={page === 'authors'}
        notifyError={notifyError}
        notify={notify}
        token={token}
        allAuthors={allAuthors}
        updateAuthorCacheWith={updateAuthorCacheWith}
        setAuthorupdateCache={setAuthorupdateCache}
        authorUpdateCache={authorUpdateCache}
      />

      <Books
        show={page === 'books'}
        optedGenre={optedGenre}
        setGenre={setGenre}
        client={client}
        allBooks={allBooks}
        bookUpdateCache={bookUpdateCache}
        setBookupdateCache={setBookupdateCache}
      />

      {page === 'recommended' &&
        <Recommended
          show={page === 'recommended'}
          favoriteBooks={favoriteBooks}
          favoriteGenre={favoriteGenre}
        />
      }

      {page === 'addBook' &&
        <BookForm
          show={page === 'addBook'}
          setPage={setPage}
          notify={notify}
          notifyError={notifyError}
          client={client}
          updateBookCacheWith={updateBookCacheWith}
        />
      }

      {page === 'login' &&
        <LoginForm
          setToken={setToken}
          notifyError={notifyError}
          setPage={setPage}
        />
      }

      {page === 'createacc' &&
        <UserForm
          setToken={setToken}
          notifyError={notifyError}
          setPage={setPage}
        />
      }

      <Footer /><br />

    </div>
    </>
  )
}

export default App
