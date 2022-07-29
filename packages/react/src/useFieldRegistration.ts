import {
  useCallback,
  useContext,
} from 'react'

import {
  RegistrationContext,
 } from './RegistrationContext'
import {
  FieldName,
  useFieldName,
} from './useFieldName'

export const useFieldRegistration = ({
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
    registerFieldName,
  } = (
    useContext(
      RegistrationContext
    )
  )

  const register = (
    useCallback(
      () => (
        registerFieldName(
          fieldName,
        )
      ),
      [
        fieldName,
        registerFieldName,
      ],
    )
  )

  return {
    register,
  }
}
