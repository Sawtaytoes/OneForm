import {
  createContext,
} from 'react'

import {
  ValuesState,
} from './useValuesState'

export type ValuesContextType<ValueType> = {
  getFieldValue: (
    ValuesState<
      ValueType
    >["getValue"]
  ),
  setFieldValue: (
    ValuesState<
      ValueType
    >["setValue"]
  ),
  subscribeToFieldValue: (
    ValuesState<
      ValueType
    >["subscribeToValue"]
  ),
}

export const defaultFieldValuesContextValue: (
  ValuesContextType<
    null
  >
) = {
  getFieldValue: () => null,
  setFieldValue: () => {},
  subscribeToFieldValue: () => () => {},
}

export const ValuesContext = (
  createContext(
    defaultFieldValuesContextValue
  )
)
