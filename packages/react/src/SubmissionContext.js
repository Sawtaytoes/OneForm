import {
  createContext,
} from 'react'

const SubmissionContext = (
  createContext({
    getAllFieldValues: () => {},
    getErrorMessages: () => {},
    getErrors: () => {},
    getFormChangeState: () => {},
    getFormValidationState: () => {},
    getFormVisitationState: () => {},
    getRegisteredFieldValues: () => {},
    getSubmissionState: () => {},
    setFormVisitationState: () => {},
    setRequiredFieldNames: () => {},
    submitForm: () => {},
    subscribeToFormChangeState: () => {},
    subscribeToFormValidationState: () => {},
    subscribeToFormVisitationState: () => {},
    subscribeToSubmissionState: () => {},
  })
)

export default SubmissionContext
