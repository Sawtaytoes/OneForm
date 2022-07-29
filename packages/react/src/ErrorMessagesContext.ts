import {
  createContext,
} from 'react'

export type ErrorMessagesContextType = {
  getFieldErrorMessages: () => void,
  setFieldErrorMessages: () => void,
  subscribeToFieldErrorMessages: () => void,
}

export const defaultErrorMessagesContextValue: (
  ErrorMessagesContextType
) = {
  getFieldErrorMessages: () => {},
  setFieldErrorMessages: () => {},
  subscribeToFieldErrorMessages: () => {},
}

export const ErrorMessagesContext = (
  createContext(
    defaultErrorMessagesContextValue
  )
)
