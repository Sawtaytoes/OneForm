import {
  memo,
  PropsWithChildren,
  ReactNode,
  useMemo,
} from 'react'

import {
  useFieldValue,
} from './useFieldValue'

const IfFieldValue = <
  ValueType,
>({
  children,
  fallback = null,
  getIsVisible = Boolean,
  name,
}: {
  children: ReactNode,
  fallback?: ReactNode,
  getIsVisible?: (
    value: (
      | ValueType
      | undefined
    )
  ) => (
    boolean
  ),
  name: string,
}) => {
  const {
    value,
  } = (
    useFieldValue<
      ValueType
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
    isVisible
    ? children
    : fallback
  )
}

const MemoizedIfFieldValue = (
  memo(
    IfFieldValue
  )
)

export {
  MemoizedIfFieldValue as IfFieldValue
}
