import {
  createContext,
} from 'react'

const FieldContext = (
  createContext({
    'checked': false,
    'data-error': '',
    'data-visited': '',
    'name': '',
    'onBlur': () => {},
    'onChange': () => {},
    'value': '',
  })
)

export default FieldContext
