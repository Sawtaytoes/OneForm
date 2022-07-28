import {
  useContext,
  useMemo,
} from 'react'

import {
  FieldGroupContext,
  FieldGroupType,
} from './FieldGroupContext'

export const useFieldGroup = ({
  id,
  name,
}: (
  FieldGroupType
)) => {
  const {
    fieldGroups: parentFieldGroups,
  } = (
    useContext(
      FieldGroupContext
    )
  )

  const fieldGroups = (
    useMemo(
      () => (
        parentFieldGroups
        .concat({
          id,
          name,
        })
      ),
      [
        id,
        name,
        parentFieldGroups,
      ],
    )
  )

  return {
    fieldGroups,
  }
}
