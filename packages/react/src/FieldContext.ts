import {
  createContext,
  SyntheticEvent,
} from 'react'

export type FieldContextType = {
  'checked': boolean,
  'data-error': (
    | boolean
    | null
  ),
  'data-visited': (
    | boolean
    | null
  ),
  'name': string,
  'onBlur': (
    event: (
      SyntheticEvent<
        Element,
        Event
      >
    ),
  ) => (
    void
  ),
  'onChange': (
    event: (
      SyntheticEvent<
        Element,
        Event
      >
    ),
  ) => (
    void
  ),
  'value': (
    | string
    | true
    | never[]
  ),
}

export const defaultFieldContextValue: (
  FieldContextType
) = {
  'checked': false,
  'data-error': null,
  'data-visited': null,
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
