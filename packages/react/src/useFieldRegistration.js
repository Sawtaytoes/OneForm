import {
  useCallback,
  useContext,
} from 'react'

import RegistrationContext from './RegistrationContext.js'
import {
  useFieldName,
} from './useFieldName'

const useFieldRegistration = ({
  name,
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

export default useFieldRegistration
