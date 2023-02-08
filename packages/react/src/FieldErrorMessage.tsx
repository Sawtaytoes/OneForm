import {
  Fragment,
  memo,
} from 'react'

import {
  useFieldErrorMessages,
} from './useFieldErrorMessages'

export type FieldErrorMessageProps = {
  name: string,
}

const FieldErrorMessage = ({
  name,
}: (
  FieldErrorMessageProps
)) => {
  const {
    errorMessages = [],
  } = (
    useFieldErrorMessages({
      name,
    })
  )

  return (
    <Fragment>
      {
        (
          errorMessages
          [0]
        )
        || ''
      }
    </Fragment>
  )
}

const MemoizedFieldErrorMessage = (
  memo(
    FieldErrorMessage
  )
) as (
  typeof FieldErrorMessage
)

export { MemoizedFieldErrorMessage as FieldErrorMessage }
