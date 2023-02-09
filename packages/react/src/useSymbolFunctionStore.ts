import {
  useCallback,
  useRef,
} from 'react'

import {
  ErrorMessages,
  Errors,
} from './useErrorMessagesState'
import {
  FieldName,
} from './useFieldName'

export type IdentifierGroup = {
  identifier: (
    | string
    | symbol
  ),
}

export type GroupValidation = {
  fieldNames: FieldName[],
  getErrorMessages: ({
    groups,
    reverseLookup,
    validationType,
    values,
  }: {
    groups: string[],
    reverseLookup?: (
      Record<
        string,
        string
      >
    ),
    validationType: string,
    values: (
      Record<
        string,
        string
      >
    ),
  }) => (
    Errors
  ),
  groupNames?: string[],
}

const initialValues: (
  Record<
    symbol,
    (
      Map<
        any,
        any
      >
    )
  >
) = {}

export const useSymbolFunctionStore = () => {
  const valuesRef = (
    useRef(
      initialValues
    )
  )

  const getSymbol = (
    useCallback(
      ({
        groupValidation,
        identifierGroup,
      }: {
        groupValidation: GroupValidation,
        identifierGroup: IdentifierGroup[],
      }) => (
        Symbol
        .for(
          [
            (
              groupValidation
              .fieldNames
            ),
            (
              groupValidation
              .groupNames
            ),
            (
              identifierGroup
              .map(({
                identifier,
              }) => (
                identifier
              ))
              .sort()
            ),
          ]
          .filter(
            Boolean
          )
          .map((
            value
          ) => (
            JSON
            .stringify(
              value
            )
          ))
          .join('')
        )
      ),
      [],
    )
  )

  const getAllValues = (
    useCallback(
      () => (
        Object
        .getOwnPropertySymbols(
          valuesRef
          .current
        )
        .map((
          symbol,
        ) => ({
          functionsMap: (
            valuesRef
            .current
            [symbol]
          ),
          symbol,
        }))
        .map(({
          functionsMap,
          symbol,
        }) => (
          Array
          .from(
            functionsMap
            .values()
          )
          .map((
            errorMessages
          ) => (
            Object
            .keys(
              errorMessages
            )
          ))
          .flat()
          .map((
            identifier,
          ) => ({
            identifier,
            symbol,
          }))
        ))
        .flat()
      ),
      [],
    )
  )

  const getValue = (
    useCallback(
      ({
        func,
        symbol,
      }) => (
        (
          (
            (
              valuesRef
              .current
              [symbol]
            )
            || new Map()
          )
          .get(
            func
          )
        )
        || {}
      ),
      [],
    )
  )

  const setValue = (
    useCallback(
      ({
        errorMessages,
        func,
        symbol,
      }: {
        errorMessages: ErrorMessages,
        func: (
          GroupValidation['getErrorMessages']
        ),
        symbol: symbol,
      }) => {
        valuesRef
        .current
        [symbol] = (
          new Map(
            valuesRef
            .current
            [symbol]
          )
          .set(
            func,
            errorMessages
          )
        )
      },
      [],
    )
  )

  const resetValues = (
    useCallback(
      () => {
        valuesRef
        .current = (
          initialValues
        )
      },
      [],
    )
  )

  return {
    getAllValues,
    getSymbol,
    getValue,
    resetValues,
    setValue,
  }
}
