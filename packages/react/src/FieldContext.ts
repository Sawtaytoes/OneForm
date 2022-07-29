import {
  createContext,
} from 'react'

export type FieldContextType = {
  'checked': boolean,
  'data-error': string,
  'data-visited': string,
  'name': string,
  'onBlur': () => void,
  'onChange': () => void,
  'value': string,
}

export const defaultFieldContextValue: (
  FieldContextType
) = {
  'checked': false,
  'data-error': '',
  'data-visited': '',
  'name': '',
  'onBlur': () => {},
  'onChange': () => {},
  'value': '',
}

export const FieldContext = (
  createContext(
    defaultFieldContextValue
  )
)
