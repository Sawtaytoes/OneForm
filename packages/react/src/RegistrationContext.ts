import {
  createContext,
} from 'react'

import {
  FieldName,
} from './useFieldName'

export type RegistrationContextType = {
  registerFieldName: (
    identifier: FieldName,
  ) => (
    unregister: () => void
  ) => (
    void
  ),
}

export const defaultRegistrationContextValue: (
  RegistrationContextType
) = {
  registerFieldName: () => () => {},
}

export const RegistrationContext = (
  createContext(
    defaultRegistrationContextValue
  )
)
