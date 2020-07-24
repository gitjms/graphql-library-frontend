import { useState } from 'react'

export const useField = (form) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    form
      ? setValue(event.target.value)
      : setValue('')
  }

  const onReset = () => {
    setValue('')
  }

  return {
    value,
    onChange,
    onReset
  }
}

export const useData = (form) => {
  const [value, setValue] = useState('')
  console.log('form',form)

  const onChange = (event) => {
    console.log('event',event)
    form
      ? setValue(event.target.value)
      : setValue('')
  }

  return {
    value,
    onChange
  }
}
