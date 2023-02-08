import {
  Fragment,
  memo,
  ReactElement,
  ReactNode,
  useMemo,
} from 'react'

import {
  FieldName,
} from './useFieldName'
import {
  useFieldValue,
} from './useFieldValue'

declare function IfFieldValueType<
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
    name: FieldName,
  }
): (
  ReactElement
)

type IfFieldValueType = typeof IfFieldValueType

const IfFieldValue: IfFieldValueType = ({
  children,
  fallback = null,
  getIsVisible = Boolean,
  name,
}) => {
  const {
    value = '',
  } = (
    useFieldValue<
      any
    >({
      name,
    })
  )

  const isVisible = (
    useMemo(
      () => (
        getIsVisible(
          value
        )
      ),
      [
        getIsVisible,
        value,
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

const MemoizedIfFieldValue = (
  memo(
    IfFieldValue
  )
) as (
  typeof IfFieldValue
)

export {
  MemoizedIfFieldValue as IfFieldValue
}
