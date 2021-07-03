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
    isHtmlElement,
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
      () => (
        isHtmlElement
        ? {
          'data-loading': (
            isSubmitting
            ? 'true'
            : null
          ),
          'data-submission-state': (
            submissionState
          ),
          'disabled': (
            isSubmitting
            || (
              isDisabledWhenInvalid
              ? !isFormValid
              : disabled
            )
          ),
        }
        : {
          disabled: (
            isSubmitting
            || (
              isDisabledWhenInvalid
              ? !isFormValid
              : disabled
            )
          ),
          formChangeState,
          isDisabled: (
            isSubmitting
            || (
              isDisabledWhenInvalid
              ? !isFormValid
              : isDisabled
            )
          ),
          isLoading: isSubmitting,
          isSubmitting,
          loading: isSubmitting,
          submissionState,
          totalErrorMessages,
        }
      ),
      [
        disabled,
        formChangeState,
        isDisabled,
        isDisabledWhenInvalid,
        isFormValid,
        isHtmlElement,
        isSubmitting,
        submissionState,
        totalErrorMessages,
      ]
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
