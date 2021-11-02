import {
  createContext,
} from 'react'

const ValuesContext = (
  createContext({
    getFieldValue: () => {},
    setFieldValue: () => {},
    subscribeToFieldValue: () => {},
  })
)

export default ValuesContext
