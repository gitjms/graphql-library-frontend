import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'


const Togglable = React.forwardRef((props, ref) => {

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
    if (visible) {
    }
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div className='btn-group' role='group'>
      <div style={hideWhenVisible}>
        <button className='btn btn-raised btn-primary'type='submit'
          onClick={toggleVisibility}
          data-toggle='tooltip' data-placement='top' title={props.buttonLabel} aria-label={props.buttonLabel}>
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible} className='togglableContent'>
        {props.children}
        <button className='btn btn-raised btn-primary'type='submit'
          onClick={toggleVisibility}
          data-toggle='tooltip' data-placement='top' title={props.closeLabel} aria-label={props.closeLabel}>
          {props.closeLabel}
        </button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable