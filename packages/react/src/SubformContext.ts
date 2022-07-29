import {
  createContext,
} from 'react'

import {
  OnChange,
  Values,
} from './useValuesState'

export type SubformAddFunction<
  ValueType
> = (
  subformId: symbol,
  value: ValueType,
) => void

export type SubformRemoveFunction = (
  subformId: symbol,
) => void

export type SubformContextType = {
  addErrorMessages: (
    SubformAddFunction<
      // TODO: Make this use the `ErrorMessage` type
      string[]
    >
  ),
  addGroupValidations: (
    SubformAddFunction<
      // TODO: Make this use the `GroupValidation` type
      object[]
    >
  ),
  addOnChange: (
    SubformAddFunction<
      OnChange<
        any
      >
    >
  ),
  addOnSubmit: (
    SubformAddFunction<
      // TODO: Make this use the `OnSubmit` type
      Function
    >
  ),
  addUpdatedErrorMessages: (
    SubformAddFunction<
      // TODO: Make this use the `ErrorMessage` type
      string[]
    >
  ),
  addUpdatedValues: (
    SubformAddFunction<
      Values<
        any
      >
    >
  ),
  addValidations: (
    SubformAddFunction<
      // TODO: Make this use the `Validation` type
      object
    >
  ),
  addValues: (
    SubformAddFunction<
      Values<
        any
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
  SubformContextType
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