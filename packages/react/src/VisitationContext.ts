import {
  createContext,
} from 'react'

import {
  Subscriber,
  Unsubscriber,
} from './createObservable'
import {
  FieldName,
} from './useFieldName'

export type VisitationContextType = {
  getIsFieldVisited: (
    identifier: FieldName,
  ) => (
    boolean
  ),
  setFieldVisited: (
    identifier: FieldName,
  ) => (
    void
  ),
  subscribeToIsFieldVisited: ({
    identifier,
    subscriber,
  }: {
    identifier: FieldName,
    subscriber: (
      Subscriber<
        boolean
      >
    ),
  }) => (
    Unsubscriber
  )
}

export const defaultVisitationContextValue: (
  VisitationContextType
) = {
  getIsFieldVisited: () => false,
  setFieldVisited: () => {},
  subscribeToIsFieldVisited: () => () => {},
}

export const VisitationContext = (
  createContext(
    defaultVisitationContextValue
  )
)
