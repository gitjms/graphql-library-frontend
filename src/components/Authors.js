import React, { useRef } from 'react'
import BirthyearForm from './BirthyearForm'
import Togglable from './Togglable'

const Authors = (props) => {

  const birthyearFormRef = useRef()

  if (!props.show) {
    return null
  }

  let authors = []
  if(props.authorUpdateCache.length === 0) {
    authors = props.allAuthors
  } else {
    authors = props.authorUpdateCache
  }

  const setBirthyear = () => (
    <Togglable buttonLabel='Set birthyear' closeLabel='close' ref={birthyearFormRef}>
      <BirthyearForm
        authors={authors}
        notify={props.notify}
        setError={props.notifyError}
        updateAuthorCacheWith={props.updateAuthorCacheWith}
        setAuthorupdateCache={props.setAuthorupdateCache}
      />
    </Togglable>
  )

  const padding = {
    paddingRight: '10px'
  }

  const alignRight = {
    float: 'right'
  }

  return (
    <>
      <div>
        <br />
        <h2 data-toggle='tooltip' data-placement='top' title='authors page' aria-label='authors page'>
          authors
        </h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th style={padding}
                data-toggle='tooltip' data-placement='top' title='born' aria-label='born'>
                born
              </th>
              <th data-toggle='tooltip' data-placement='top' title='books' aria-label='books'>
                books
              </th>
            </tr>
            {authors.map(a =>
              <tr key={a.name}>
                <td style={padding}
                  data-toggle='tooltip' data-placement='top' title={a.name} aria-label={a.name}>
                  {a.name}
                </td>
                <td style={padding}
                  data-toggle='tooltip' data-placement='top' title={a.born} aria-label={a.born}>
                  {a.born}
                </td>
                <td style={alignRight}
                  data-toggle='tooltip' data-placement='top' title={a.bookCount} aria-label={a.bookCount}>
                  {a.bookCount}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {props.token &&
        <div>
          {setBirthyear()}
        </div>
      }
    </>
  )
}

export default Authors
