import {
  useCallback,
  useMemo,
} from 'react'

import createObservable from './createObservable.js'

const useFormValidationState = () => {
  const formValidationStateObservable = (
    useMemo(
      () => (
        createObservable({
          isFormValid: false,
          totalErrorMessages: 0,
        })
      ),
      [],
    )
  )

  const getFormValidationState = (
    useCallback(
      () => (
        formValidationStateObservable
        .getValue()
      ),
      [
        formValidationStateObservable,
      ],
    )
  )

  const setFormValidationState = (
    useCallback(
      ({
        errorMessagesLength,
      }) => {
        formValidationStateObservable
        .publish({
          isFormValid: (
            errorMessagesLength
            === 0
          ),
          totalErrorMessages: (
            errorMessagesLength
          ),
        })
      },
      [
        formValidationStateObservable,
      ],
    )
  )

  const subscribeToFormValidationState = (
    useCallback(
      (
        subscriber,
      ) => (
        formValidationStateObservable
        .subscribe(
          subscriber
        )
      ),
      [
        formValidationStateObservable,
      ],
    )
  )

  return {
    getFormValidationState,
    setFormValidationState,
    subscribeToFormValidationState,
  }
}

export default useFormValidationState
