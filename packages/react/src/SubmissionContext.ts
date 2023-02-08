import {
  createContext,
} from 'react'

import {
  useErrorMessagesState,
} from './useErrorMessagesState'
import {
  useFormChangeState,
} from './useFormChangeState'
import {
  useFormValidationState,
} from './useFormValidationState'
import {
  useFormVisitationState,
} from './useFormVisitationState'
import {
  useRegistrationState,
} from './useRegistrationState'
import {
  useSubmissionState,
} from './useSubmissionState'
import {
  useValuesState,
} from './useValuesState'

export type SubmissionContextType = {
  getAllFieldValues: (
    ReturnType<
      typeof useValuesState<
        any
      >
    >['getAllValues']
  ),
  getErrorMessages: (
    ReturnType<
      typeof useErrorMessagesState
    >['getErrorMessages']
  ),
  getErrors: (
    ReturnType<
      typeof useErrorMessagesState
    >['getAllErrorMessages']
  ),
  getFormChangeState: ReturnType<
  typeof useFormChangeState
>['getFormChangeState'],
  getFormValidationState: (
    ReturnType<
      typeof useFormValidationState
    >['getFormValidationState']
  ),
  getFormVisitationState: (
    ReturnType<
      typeof useFormVisitationState
    >['getFormVisitationState']
  ),
  getRegisteredFieldValues: (
    ReturnType<
      typeof useRegistrationState
    >['getAllRegistrations']
  ),
  getSubmissionState: (
    ReturnType<
      typeof useSubmissionState
    >['getSubmissionState']
  ),
  setFormVisitationState: (
    ReturnType<
      typeof useFormVisitationState
    >['setFormVisitationState']
  ),
  setRequiredFieldNames: (
    ReturnType<
      typeof useFormVisitationState
    >['setRequiredFieldNames']
  ),
  submitForm: () => void,
  subscribeToFormChangeState: (
    ReturnType<
      typeof useFormChangeState
    >['subscribeToFormChangeState']
  ),
  subscribeToFormValidationState: (
    ReturnType<
      typeof useFormValidationState
    >['subscribeToFormValidationState']
  ),
  subscribeToFormVisitationState: (
    ReturnType<
      typeof useFormVisitationState
    >['subscribeToFormVisitationState']
  ),
  subscribeToSubmissionState: (
    ReturnType<
      typeof useSubmissionState
    >['subscribeToSubmissionState']
  ),
}

export const SubmissionContext = (
  createContext<
    SubmissionContextType
  >({
    getAllFieldValues: () => ({}),
    getErrorMessages: () => [],
    getErrors: () => ({}),
    getFormChangeState: () => null,
    getFormValidationState: () => null,
    getFormVisitationState: () => null,
    getRegisteredFieldValues: () => ({}),
    getSubmissionState: () => null,
    setFormVisitationState: () => {},
    setRequiredFieldNames: () => {},
    submitForm: () => {},
    subscribeToFormChangeState: () => () => {},
    subscribeToFormValidationState: () => () => {},
    subscribeToFormVisitationState: () => () => {},
    subscribeToSubmissionState: () => () => {},
  })
)
