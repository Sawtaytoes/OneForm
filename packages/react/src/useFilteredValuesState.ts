import {
  useCallback,
  useRef,
} from 'react'
import {
  FieldName,
} from './useFieldName'
import {
  GroupValidation,
} from './useSymbolFunctionStore'

export type GroupValidationIdentifier = {
  identifiers: FieldName[],
  value: GroupValidation,
}

const initialIdentifiersList: (
  Array<
    GroupValidationIdentifier
  >
) = []

const initialSubscribedValues: (
  Record<
    FieldName,
    GroupValidation[]
  >
) = {}

export const useFilteredValuesState = ({
  identifiersList = (
    initialIdentifiersList
  ),
}) => {
  const filteredValuesRef = (
    useRef(
      initialSubscribedValues
    )
  )

  const identifiersListRef = (
    useRef(
      identifiersList
    )
  )

  identifiersListRef
  .current = (
    identifiersList
  )

  const getFilteredValue = (
    useCallback(
      (
        identifier,
      ) => (
        filteredValuesRef
        .current
        [identifier]
      ),
      [],
    )
  )

  const setFilteredValue = (
    useCallback(
      ({
        identifier,
        listIdentifier,
      }: {
        identifier: FieldName,
        listIdentifier: FieldName,
      }) => {
        if (
          getFilteredValue(
            identifier
          )
        ) {
          return
        }

        filteredValuesRef
        .current = {
          ...(
            filteredValuesRef
            .current
          ),
          [identifier]: (
            identifiersListRef
            .current
            .filter(({
              identifiers,
            }) => (
              identifiers
              .includes(
                listIdentifier
              )
            ))
            .map(({
              value,
            }) => (
              value
            ))
          ),
        }
      },
      [
        getFilteredValue,
      ],
    )
  )

  const resetFilteredValues = (
    useCallback(
      () => {
        filteredValuesRef
        .current = (
          initialSubscribedValues
        )
      },
      [],
    )
  )

  return {
    getFilteredValue,
    resetFilteredValues,
    setFilteredValue,
  }
}
