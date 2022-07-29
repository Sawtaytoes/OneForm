import {
  useCallback,
  useRef,
} from 'react'

export enum ValidationType {
  change = 'change',
  submit = 'submit',
}

export const useValidationType = () => {
  const validationTypeRef = (
    useRef(
      ValidationType
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
          ValidationType
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
          ValidationType
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
