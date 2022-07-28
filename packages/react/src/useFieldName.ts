import {
  useContext,
  useMemo,
} from 'react'

import {
  FieldGroupContext,
} from './FieldGroupContext'

export type FieldName = string

export const useFieldName = ({
  name,
}: {
  name: FieldName,
}) => {
  const {
    fieldGroups,
  } = (
    useContext(
      FieldGroupContext
    )
  )

  const fieldName: (
    FieldName
  ) = (
    useMemo(
      () => (
        [
          name,
        ]
        .concat(
          fieldGroups
          .map(({
            id,
            name,
          }) => (
            `/${name}:${id}`
          ))
        )
        .join('')
      ),
      [
        fieldGroups,
        name,
      ],
    )
  )

  return {
    fieldName,
  }
}
