import {
  Children,
  cloneElement,
  Fragment,
  memo,
  ReactElement,
  ReactNode,
  useMemo,
} from 'react'

import useFormSubmission from './useFormSubmission'

declare function FormType<
  TranslatePropsReturnType
>(
  props: {
    children: ReactNode,
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

export type FormType = typeof FormType

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
}

const MemoizedForm = (
  memo(
    Form
  )
) as (
  // TODO: Fix this hack using a native solution. This ensures `ReturnType` is inferred when part of `translateProps`.
  typeof Form
)

export {
  MemoizedForm as Form
}
