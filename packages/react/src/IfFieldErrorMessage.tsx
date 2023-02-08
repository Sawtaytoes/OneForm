import {
  Fragment,
  memo,
  ReactNode,
  useMemo,
} from 'react'

import {
  FieldName,
} from './useFieldName'
import {
  useFieldErrorMessages,
} from './useFieldErrorMessages'
import { ErrorMessages } from './ErrorMessagesContext'

const defaultGetIsVisible = (
  errorMessages: ErrorMessages
) => (
  (
    errorMessages
    ?.length
  )
  > 0
)

export type IfFieldErrorMessageProps = {
  children: ReactNode,
  fallback?: ReactNode,
  getIsVisible?: (
    errorMessages: ErrorMessages
  ) => (
    boolean
  ),
  name: FieldName,
}

const IfFieldErrorMessage = ({
  children,
  fallback = null,
  getIsVisible = defaultGetIsVisible,
  name,
}: (
  IfFieldErrorMessageProps
)) => {
  const {
    errorMessages = [],
  } = (
    useFieldErrorMessages({
      name,
    })
  )

  const isVisible = (
    useMemo(
      () => (
        getIsVisible(
          errorMessages
        )
      ),
      [
        errorMessages,
        getIsVisible,
      ]
    )
  )

  return (
    <Fragment>
      {
        isVisible
        ? children
        : fallback
      }
    </Fragment>
  )
}

const MemoizedIfFieldErrorMessage = (
  memo(
    IfFieldErrorMessage
  )
)

export {
  MemoizedIfFieldErrorMessage as IfFieldErrorMessage,
}
