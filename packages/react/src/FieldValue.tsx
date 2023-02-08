import {
  Fragment,
  memo,
} from 'react'

import {
  FieldName,
} from './useFieldName'
import {
  useFieldValue,
} from './useFieldValue'

const FieldValue = ({
  name,
}: {
  name: FieldName,
}) => {
  const {
    value = '',
  } = (
    useFieldValue<
      | string
      | string[]
    >({
      name,
    })
  )

  return (
    <Fragment>
      {value}
    </Fragment>
  )
}

const MemoizedFieldValue = (
  memo(
    FieldValue
  )
)

export {
  MemoizedFieldValue as FieldValue
}
