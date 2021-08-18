import {
  useContext,
  useEffect,
  useMemo,
} from 'react'

import FieldGroupContext from './FieldGroupContext'

export const errorMessages = {
  nonStringName: (
    'Field `name` needs to be a string.'
  ),
  undefinedName: (
    'Field `name` is `undefined`. Make sure you pass it in as `{ name: "myFieldName" }`.'
  ),
}

const useFieldName = ({
  name,
}) => {
  useEffect(
    () => {
      if (typeof name !== 'string') {
        if (typeof name === 'undefined') {
          throw new Error(
            errorMessages
            .undefinedName
          )
        }
        else {
          throw new Error(
            errorMessages
            .nonStringName
          )
        }
      }
    },
    [
      name,
    ],
  )

  const {
    fieldGroups,
  } = (
    useContext(
      FieldGroupContext
    )
  )

  const fieldName = (
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

export default useFieldName
