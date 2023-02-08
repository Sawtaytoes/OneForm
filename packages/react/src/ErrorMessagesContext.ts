import {
  createContext,
} from 'react'

import {
  Subscriber,
  Unsubscriber,
} from './createObservable'
import {
  ErrorMessages,
} from './useErrorMessagesState'
import {
  FieldName,
} from './useFieldName'

export type ErrorMessagesContextType = {
  getFieldErrorMessages: (
    identifier: FieldName,
  ) => (
    ErrorMessages
  ),
  setFieldErrorMessages: (
    identifier: FieldName,
    {
      errorMessages,
      symbol,
    }: {
      errorMessages: ErrorMessages,
      symbol: symbol,
    },
  ) => (
    void
  ),
  subscribeToFieldErrorMessages: ({
    identifier,
    subscriber,
  }: {
    identifier: FieldName,
    subscriber: (
      Subscriber<
        ErrorMessages
      >
    ),
  }) => (
    Unsubscriber
  ),
}

export const defaultErrorMessagesContextValue: (
  ErrorMessagesContextType
) = {
  getFieldErrorMessages: () => [],
  setFieldErrorMessages: () => {},
  subscribeToFieldErrorMessages: () => () => {},
}

export const ErrorMessagesContext = (
  createContext(
    defaultErrorMessagesContextValue
  )
)
