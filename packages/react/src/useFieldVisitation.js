import {
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import useFieldName from './useFieldName.js'
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
    ,
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

  return {
    isVisited: (
      getIsFieldVisited(
        fieldName
      )
    ),
    setVisited,
  }
}

export default useFieldVisitation
