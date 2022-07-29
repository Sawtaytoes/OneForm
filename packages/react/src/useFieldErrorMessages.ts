import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import {
  ErrorMessages,
  ErrorMessagesContext,
} from './ErrorMessagesContext'
import {
  FieldName,
  useFieldName,
} from './useFieldName'

export const useFieldErrorMessages = ({
  name,
}: {
  name: FieldName,
}) => {
  const fieldErrorMessagesSymbol = (
    useMemo(
      () => (
        Symbol()
      ),
      []
    )
  )

  const {
    fieldName,
  } = (
    useFieldName({
      name,
    })
  )

  const {
    getFieldErrorMessages,
    setFieldErrorMessages,
    subscribeToFieldErrorMessages,
  } = (
    useContext(
      ErrorMessagesContext
    )
  )

  const [
    localErrorMessages,
    setLocalErrorMessages,
  ] = (
    useState(
      getFieldErrorMessages(
        fieldName
      )
    )
  )

  const setErrorMessages = (
    useCallback(
      (
        errorMessages: ErrorMessages,
      ) => {
        setFieldErrorMessages(
          fieldName,
          {
            errorMessages,
            symbol: (
              fieldErrorMessagesSymbol
            ),
          },
        )
      },
      [
        fieldErrorMessagesSymbol,
        fieldName,
        setFieldErrorMessages,
      ],
    )
  )

  useEffect(
    () => (
      subscribeToFieldErrorMessages({
        identifier: (
          fieldName
        ),
        subscriber: (
          setLocalErrorMessages
        ),
      })
    ),
    [
      fieldName,
      subscribeToFieldErrorMessages,
    ],
  )

  useEffect(
    () => (
      setLocalErrorMessages(
        getFieldErrorMessages(
          fieldName
        )
      )
    ),
    [
      fieldName,
      getFieldErrorMessages,
    ],
  )

  return {
    errorMessages: localErrorMessages,
    setErrorMessages,
  }
}
