import {
  useContext,
  useEffect,
  useState,
} from 'react'

import SubmissionContext from './SubmissionContext.js'
import {
  submissionStates,
} from './useSubmissionState'

const initialRequiredFieldNames = []

const useFormSubmission = (
  {
    requiredFieldNames = initialRequiredFieldNames,
  } = {}
) => {
  const {
    getAllFieldValues,
    getErrorMessages,
    getErrors,
    getFormChangeState,
    getFormValidationState,
    getFormVisitationState,
    getRegisteredFieldValues,
    getSubmissionState,
    setRequiredFieldNames,
    submitForm,
    subscribeToFormChangeState,
    subscribeToFormValidationState,
    subscribeToFormVisitationState,
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
    formVisitationState,
    setFormVisitationState,
  ] = (
    useState(
      getFormVisitationState()
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
      subscribeToFormVisitationState(
        setFormVisitationState
      )
    ),
    [
      subscribeToFormVisitationState,
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
      setFormVisitationState(
        getFormVisitationState()
      )
    ),
    [
      getFormVisitationState,
    ],
  )

  useEffect(
    () => (
      setRequiredFieldNames(
        requiredFieldNames
      )
    ),
    [
      requiredFieldNames,
      setRequiredFieldNames,
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
    getAllFieldValues,
    getErrorMessages,
    getErrors,
    getRegisteredFieldValues,
    isSubmitting: (
      submissionState
      === (
        submissionStates
        .pendingSubmission
      )
    ),
    isValid: (
      formValidationState
      .isFormValid
    ),
    isValidForSubmission: (
      (
        formValidationState
        .isFormValid
      )
      && (
        formVisitationState
        .isFormVisited
      )
    ),
    isVisited: (
      formVisitationState
      .isFormVisited
    ),
    submissionState,
    submitForm,
    totalErrorMessages: (
      formValidationState
      .totalErrorMessages
    ),
    totalUnvisitedFields: (
      formVisitationState
      .totalUnvisitedFields
    ),
    totalVisitedFields: (
      formVisitationState
      .totalVisitedFields
    ),
  }
}

export default useFormSubmission
