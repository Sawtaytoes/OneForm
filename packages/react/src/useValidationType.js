import {
  useCallback,
  useRef,
} from 'react'

export const validationTypes = {
  change: 'change',
  submit: 'submit',
}

const useValidationType = () => {
  const validationTypeRef = (
    useRef(
      validationTypes
      .change
    )
  )

  const getValidationType = (
    useCallback(
      () => (
        validationTypeRef
        .current
      ),
      [],
    )
  )

  const setValidationTypeChange = (
    useCallback(
      () => (
        validationTypeRef
        .current = (
          validationTypes
          .change
        )
      ),
      [],
    )
  )

  const setValidationTypeSubmit = (
    useCallback(
      () => (
        validationTypeRef
        .current = (
          validationTypes
          .submit
        )
      ),
      [],
    )
  )

  return {
    getValidationType,
    setValidationTypeChange,
    setValidationTypeSubmit,
  }
}

export default useValidationType
