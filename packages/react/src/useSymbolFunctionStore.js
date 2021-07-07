import {
  useCallback,
  useRef,
} from 'react'

const initialValues = {}

const useSymbolFunctionStore = () => {
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
        .entries(
          valuesRef
          .current
        )
        .forEach(([
          symbol,
          functionsMap,
        ]) => (
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

export default useSymbolFunctionStore
