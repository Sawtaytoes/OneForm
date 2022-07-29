import {
  Children,
  cloneElement,
  memo,
  ReactElement,
  useMemo,
} from 'react'

import useFormSubmission from './useFormSubmission.js'

const defaultProps = {
  translateProps: () => {},
}

const Form = ({
  children,
  translateProps = (
    defaultProps
    .translateProps
  ),
}: {
  children: ReactElement,
  translateProps: ({
    submitForm,
  }: {
    submitForm: () => void,
  }) => (
    | object
    | void
  ),
}) => {
  const {
    submitForm,
  } = (
    useFormSubmission()
  )

  const childProps = (
    useMemo(
      () => (
        (
          translateProps({
            submitForm,
          })
        )
        || {
          onSubmit: submitForm,
        }
      ),
      [
        submitForm,
        translateProps,
      ],
    )
  )

  return (
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
}

const MemoizedForm = (
  memo(
    Form
  )
)

export {
  MemoizedForm as Form
}
