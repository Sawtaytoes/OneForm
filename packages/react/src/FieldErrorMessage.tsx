import {
  Fragment,
  memo,
} from 'react'

import {
  useFieldErrorMessages,
} from './useFieldErrorMessages'

export type FieldErrorMessageType = {
  name: string,
}

const FieldErrorMessage = ({
  name,
}: (
  FieldErrorMessageType
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
