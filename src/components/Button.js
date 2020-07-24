import React from 'react'

const Button = (props) => {
  return(
    <button type='button' className='btn btn-raised btn-warning mr-1'
      value={props.genre}
      onClick={() => {
        props.setGenre(props.genre)
      }}
      id='genre-button'
      data-toggle='tooltip' data-placement='top' title={props.genre} aria-label={props.genre}
    >
    {props.genre}
    </button>
  )
}

export default Button