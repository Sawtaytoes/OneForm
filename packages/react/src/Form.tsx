import {
  Children,
  cloneElement,
  memo,
  ReactElement,
  useMemo,
} from 'react'

import useFormSubmission from './useFormSubmission'

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
  ReactElement
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
) as (
  typeof Form
)

export {
  MemoizedForm as Form
}
