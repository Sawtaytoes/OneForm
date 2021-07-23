import {
  useContext,
  useEffect,
  useMemo,
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
    formChangeState,
    setFormChangeState,
  ] = (
    useState(
      getFormChangeState()
    )
  )

  const [
    formValidationState,
    setFormValidationState,
  ] = (
    useState(
      getFormValidationState()
    )
  )

  const [
    submissionState,
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
      setFormChangeState(
        getFormChangeState()
      )
    ),
    [
      getFormChangeState,
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
      setFormValidationState(
        getFormValidationState()
      )
    ),
    [
      getFormValidationState,
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

  useEffect(
    () => (
      setSubmissionState(
        getSubmissionState()
      )
    ),
    [
      getSubmissionState,
    ],
  )

  return {
    formChangeState,
    isFormValid: (
      formValidationState
      .isFormValid
    ),
    isSubmitting: (
      submissionState
      === (
        submissionStates
        .pendingSubmission
      )
    ),
    submissionState,
    totalErrorMessages: (
      formValidationState
      .totalErrorMessages
    ),
  }
}

export default useFormSubmission
