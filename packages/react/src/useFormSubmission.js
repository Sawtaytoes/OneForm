import {
  useContext,
  useEffect,
  useState,
} from 'react'

import SubmissionContext from './SubmissionContext.js'
import {
  submissionStates,
} from './useSubmissionState'

const useFormSubmission = () => {
  const {
    getFormChangeState,
    getFormValidationState,
    getSubmissionState,
    subscribeToFormChangeState,
    subscribeToFormValidationState,
    subscribeToSubmissionState,
  } = (
    useContext(
      SubmissionContext
    )
  )

  const [
    ,
    setFormChangeState,
  ] = (
    useState(
      getFormChangeState()
    )
  )

  const [
    ,
    setFormValidationState,
  ] = (
    useState(
      getFormValidationState()
    )
  )

  const [
    ,
    setSubmissionState,
  ] = (
    useState(
      getSubmissionState()
    )
  )

  useEffect(
    () => (
      subscribeToFormChangeState(
        setFormChangeState
      )
    ),
    [
      subscribeToFormChangeState,
    ],
  )

  useEffect(
    () => (
      subscribeToFormValidationState(
        setFormValidationState
      )
    ),
    [
      subscribeToFormValidationState,
    ],
  )

  useEffect(
    () => (
      subscribeToSubmissionState(
        setSubmissionState
      )
    ),
    [
      subscribeToSubmissionState,
    ],
  )

  return {
    formChangeState: (
      getFormChangeState()
    ),
    isFormValid: (
      getFormValidationState()
      .isFormValid
    ),
    isSubmitting: (
      getSubmissionState()
      === (
        submissionStates
        .pendingSubmission
      )
    ),
    submissionState: (
      getSubmissionState()
    ),
    totalErrorMessages: (
      getFormValidationState()
      .totalErrorMessages
    ),
  }
}

export default useFormSubmission
