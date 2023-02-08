import {
  useCallback,
  useRef,
} from 'react'

const initialIdentifiersList = []
const initialSubscribedValues = {}

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
    useRef()
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
