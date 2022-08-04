import {
  createContext,
} from 'react'

import {
  RegistrationState,
} from './useRegistrationState'

export type RegistrationContextType = {
  registerFieldName: (
    RegistrationState["register"]
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
