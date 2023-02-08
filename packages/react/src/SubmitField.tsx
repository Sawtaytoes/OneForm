import {
  Children,
  cloneElement,
  Fragment,
  memo,
  ReactElement,
  ReactNode,
  useMemo,
} from 'react'

import {
  useFormSubmission,
} from './useFormSubmission'

const defaultGetIsVisible = () => (
  true
)

declare function SubmitFieldType<
  ValueType
>(
  props: {
    children: ReactNode,
    fallback?: ReactNode,
    getIsVisible?: (
      value: ValueType
    ) => (
      boolean
    ),
    isDisabledWhenInvalid?: boolean,
  }
): (
  ReactElement
)

type SubmitFieldType = typeof SubmitFieldType

const SubmitField: SubmitFieldType = ({
  children,
  fallback,
  getIsVisible = defaultGetIsVisible,
  isDisabledWhenInvalid,
}) => {
  const {
    disabled,
    isDisabled,
  } = (
    (
      children
      ?.props
    )
    || {}
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
          <Fragment>
            {
              Children
              .only(
                children
              )
            }
          </Fragment>
        ),
        childProps,
      )
    )
    : (
      <Fragment>
        {
          fallback
          || null
        }
      </Fragment>
    )
  )
}

const MemoizedSubmitField = (
  memo(
  SubmitField
  )
)

export { MemoizedSubmitField as SubmitField }
