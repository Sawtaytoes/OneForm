import PropTypes from 'prop-types'
import {
  Children,
  cloneElement,
  memo,
  useMemo,
} from 'react'

import useFormSubmission from './useFormSubmission'

const defaultGetIsVisible = () => (
  true
)

const propTypes = {
  children: PropTypes.node,
  fallback: PropTypes.node,
  getIsVisible: PropTypes.func,
  isDisabledWhenInvalid: PropTypes.bool,
}

const SubmitField = ({
  children,
  fallback,
  getIsVisible = defaultGetIsVisible,
  isDisabledWhenInvalid,
}) => {
  const {
    disabled,
    isDisabled,
  } = (
    children
    .props
  )

  const {
    formChangeState,
    isFormValid,
    isSubmitting,
    submissionState,
    totalErrorMessages,
  } = (
    useFormSubmission({
      children,
    })
  )

  const childProps = (
    useMemo(
      () => ({
        'data-form-change-state': (
          formChangeState
        ),
        'data-loading': (
          isSubmitting
          ? 'true'
          : null
        ),
        'data-submission-state': (
          submissionState
        ),
        'data-total-error-messages': (
          totalErrorMessages
        ),
        'disabled': (
          isSubmitting
          || (
            isDisabledWhenInvalid
            ? !isFormValid
            : (
              disabled
              || isDisabled
            )
          )
        ),
      }),
      [
        disabled,
        formChangeState,
        isDisabled,
        isDisabledWhenInvalid,
        isFormValid,
        isSubmitting,
        submissionState,
        totalErrorMessages,
      ],
    )
  )

  const isVisible = (
    useMemo(
      () => (
        getIsVisible({
          formChangeState,
          isFormValid,
          isSubmitting,
          submissionState,
          totalErrorMessages,
        })
      ),
      [
        formChangeState,
        getIsVisible,
        isFormValid,
        isSubmitting,
        submissionState,
        totalErrorMessages,
      ]
    )
  )

  return (
    isVisible
    ? (
      cloneElement(
        (
          Children
          .only(
            children
          )
        ),
        childProps,
      )
    )
    : (
      fallback
      || null
    )
  )
}

SubmitField.propTypes = propTypes

const MemoizedSubmitField = memo(SubmitField)

export default MemoizedSubmitField
