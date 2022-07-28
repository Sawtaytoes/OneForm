import {
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import {
  FieldName,
  useFieldName,
} from './useFieldName'
import {
  ValuesContext,
} from './ValuesContext'

export const useFieldValue = ({
  name,
}: {
  name: FieldName,
}) => {
  const {
    fieldName,
  } = (
    useFieldName({
      name,
    })
  )

  const {
    getFieldValue,
    setFieldValue,
    subscribeToFieldValue,
  } = (
    useContext(
      ValuesContext
    )
  )

  const [
    localValue,
    setLocalValue,
  ] = (
    useState(
      getFieldValue(
        fieldName
      )
    )
  )

  const setValue = (
    useCallback(
      (
        value,
      ) => {
        setFieldValue(
          fieldName,
          value,
        )
      },
      [
        fieldName,
        setFieldValue,
      ],
    )
  )

  useEffect(
    () => (
      setLocalValue(
        getFieldValue(
          fieldName
        )
      )
    ),
    [
      fieldName,
      getFieldValue,
    ],
  )

  useEffect(
    () => (
      subscribeToFieldValue({
        identifier: (
          fieldName
        ),
        subscriber: (
          setLocalValue
        ),
      })
    ),
    [
      fieldName,
      subscribeToFieldValue,
    ],
  )

  return {
    setValue,
    value: localValue,
  }
}
