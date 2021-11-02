import {
  createContext,
} from 'react'

const ErrorMessagesContext = (
  createContext({
    getFieldErrorMessages: () => {},
    setFieldErrorMessages: () => {},
    subscribeToFieldErrorMessages: () => {},
  })
)

export default ErrorMessagesContext
