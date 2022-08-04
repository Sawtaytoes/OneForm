import {
  createContext,
} from 'react'

import {
  ValuesState,
} from './useValuesState'

export type ValuesContextType<
  ValueType = any
> = {
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
  ValuesContextType
) = {
  getFieldValue: () => null,
  setFieldValue: () => {},
  subscribeToFieldValue: () => () => {},
}

export const ValuesContext = (
  createContext<
    ValuesContextType<
      any
    >
  >(
    defaultFieldValuesContextValue
  )
)
