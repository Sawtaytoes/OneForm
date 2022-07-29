import {
  useFieldErrorMessages,
} from './useFieldErrorMessages'
import {
  FieldName,
  useFieldName,
} from './useFieldName'
import {
  useFieldRegistration,
} from './useFieldRegistration'
import {
  useFieldValue,
} from './useFieldValue'
import {
  useFieldVisitation,
} from './useFieldVisitation'

export const useFieldData = <
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
    errorMessages,
    setErrorMessages,
  } = (
    useFieldErrorMessages({
      name,
    })
  )

  const {
    register,
  } = (
    useFieldRegistration({
      name,
    })
  )

  const {
    setValue,
    value,
  } = (
    useFieldValue<
      ValueType
    >({
      name,
    })
  )

  const {
    isVisited,
    setVisited,
  } = (
    useFieldVisitation({
      name,
    })
  )

  return {
    errorMessages,
    fieldName,
    isVisited,
    register,
    setErrorMessages,
    setValue,
    setVisited,
    value,
  }
}
