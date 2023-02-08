import {
  createContext,
} from 'react'

import {
  ErrorMessages,
} from './useErrorMessagesState'
import {
  OnChange,
  Values,
} from './useValuesState'

export type GroupValidations = {
  fieldNames: string[],
  getErrorMessages: () => (
    | {
      string: (
        | boolean
        | ErrorMessages
        | string
      ),
    }
    | null
  )
}[]

export type OnSubmit = (
  () => void
)

export type Validations = {
  string: (() => boolean)[],
}

export type SubformAddFunction<
  ValueType
> = (
  subformId: symbol,
  value: ValueType,
) => (
  void
)

export type SubformRemoveFunction = (
  subformId: symbol,
) => (
  void
)

export type SubformContextType<
  ValueType
> = {
  addErrorMessages: (
    SubformAddFunction<
      ErrorMessages
    >
  ),
  addGroupValidations: (
    SubformAddFunction<
      GroupValidations
    >
  ),
  addOnChange: (
    SubformAddFunction<
      OnChange<
        ValueType
      >
    >
  ),
  addOnSubmit: (
    SubformAddFunction<
      OnSubmit
    >
  ),
  addUpdatedErrorMessages: (
    SubformAddFunction<
      ErrorMessages
    >
  ),
  addUpdatedValues: (
    SubformAddFunction<
      Values<
        ValueType
      >
    >
  ),
  addValidations: (
    SubformAddFunction<
      Validations
    >
  ),
  addValues: (
    SubformAddFunction<
      Values<
        ValueType
      >
    >
  ),
  removeErrorMessages: (
    SubformRemoveFunction
  ),
  removeGroupValidations: (
    SubformRemoveFunction
  ),
  removeOnChange: (
    SubformRemoveFunction
  ),
  removeOnSubmit: (
    SubformRemoveFunction
  ),
  removeUpdatedErrorMessages: (
    SubformRemoveFunction
  ),
  removeUpdatedValues: (
    SubformRemoveFunction
  ),
  removeValidations: (
    SubformRemoveFunction
  ),
  removeValues: (
    SubformRemoveFunction
  ),
}

export const defaultSubformContextValue: (
  SubformContextType<
    any
  >
) = {
  addErrorMessages: () => {},
  addGroupValidations: () => {},
  addOnChange: () => {},
  addOnSubmit: () => {},
  addUpdatedErrorMessages: () => {},
  addUpdatedValues: () => {},
  addValidations: () => {},
  addValues: () => {},
  removeErrorMessages: () => {},
  removeGroupValidations: () => {},
  removeOnChange: () => {},
  removeOnSubmit: () => {},
  removeUpdatedErrorMessages: () => {},
  removeUpdatedValues: () => {},
  removeValidations: () => {},
  removeValues: () => {},
}

export const SubformContext = (
  createContext(
    defaultSubformContextValue
  )
)
