import {
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import {
  useFieldName,
} from './useFieldName'
import VisitationContext from './VisitationContext.js'

const useFieldVisitation = ({
  name,
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

export default useFieldVisitation
