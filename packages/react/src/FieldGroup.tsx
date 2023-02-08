import {
  memo,
  ReactNode,
  useMemo,
} from 'react'

import {
  FieldGroupContext,
  FieldGroupType,
} from './FieldGroupContext'
import {
  useFieldGroup,
} from './useFieldGroup'

export type FieldGroupProps = (
  FieldGroupType
  & {
    children: ReactNode,
  }
)

const FieldGroup = ({
  children,
  id,
  name,
}: (
  FieldGroupProps
)) => {
  const {
    fieldGroups,
  } = (
    useFieldGroup({
      id,
      name,
    })
  )

  const fieldGroupProviderValue = (
    useMemo(
      () => ({
        fieldGroups,
      }),
      [
        fieldGroups,
      ],
    )
  )

  return (
    <FieldGroupContext.Provider
      value={fieldGroupProviderValue}
    >
      {children}
    </FieldGroupContext.Provider>
  )
}

const MemoizedFieldGroup = (
  memo(
    FieldGroup
  )
)

export {
  MemoizedFieldGroup as FieldGroup
}
