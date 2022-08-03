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
  ValuesContextType,
} from './ValuesContext'

export const useFieldValue = <
  ValueType
>({
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
    useContext<
      ValuesContextType<
        ValueType
      >
    >(
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
        value: ValueType,
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
