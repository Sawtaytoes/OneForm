import {
  Children,
  cloneElement,
  memo,
  ReactElement,
  useMemo,
} from 'react'

import useFormSubmission from './useFormSubmission.js'

declare function FormType<
  TranslatePropsReturnType
>(
  props: {
    children: ReactElement,
    translateProps?: ({
      submitForm,
    }: {
      submitForm: () => void,
    }) => (
      | TranslatePropsReturnType
      | void
    ),
  }
): (
  JSX
  .Element
)

type FormType = typeof FormType

const defaultProps = {
  translateProps: () => {},
}

const Form: FormType = ({
  children,
  translateProps = (
    defaultProps
    .translateProps
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
// TODO: Fix this hack using a native solution. This ensures `ReturnType` is inferred when part of `translateProps`.
) as FormType

export {
  MemoizedForm as Form
}
