import {
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import {
  FieldName,
  useFieldName,
} from './useFieldName'
import {
  VisitationContext,
} from './VisitationContext'

export const useFieldVisitation = ({
  name,
}: {
  name: FieldName,
}) => {
  const {
    fieldName,
  } = (
    useFieldName({
      name,
    })
  )

  const {
    getIsFieldVisited,
    setFieldVisited,
    subscribeToIsFieldVisited,
  } = (
    useContext(
      VisitationContext
    )
  )

  const [
    isVisited,
    setIsVisited,
  ] = (
    useState(
      getIsFieldVisited(
        fieldName
      )
    )
  )

  const setVisited = (
    useCallback(
      () => {
        setFieldVisited(
          fieldName,
        )
      },
      [
        fieldName,
        setFieldVisited,
      ],
    )
  )

  useEffect(
    () => (
      subscribeToIsFieldVisited({
        identifier: (
          fieldName
        ),
        subscriber: (
          setIsVisited
        ),
      })
    ),
    [
      fieldName,
      subscribeToIsFieldVisited,
    ],
  )

  useEffect(
    () => (
      setIsVisited(
        getIsFieldVisited(
          fieldName
        )
      )
    ),
    [
      fieldName,
      getIsFieldVisited,
    ],
  )

  return {
    isVisited,
    setVisited,
  }
}
