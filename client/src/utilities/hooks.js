import { useState } from 'react'

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState)

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    //callback makes hook generic so it can be used across multiple components
    callback()
  }

  return {
    onChange,
    onSubmit,
    values
  }
}