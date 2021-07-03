import {
  useCallback,
  useRef,
} from 'react'

const initialIdentifiersList = []
const initialSubscribedValues = {}

const useFilteredValuesState = ({
  identifiersList = (
    initialIdentifiersList
  ),
}) => {
  const filteredValuesRef = (
    useRef(
      initialSubscribedValues
    )
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
            identifiersList
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
        identifiersList,
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

export default useFilteredValuesState
