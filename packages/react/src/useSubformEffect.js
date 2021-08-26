import {
  useEffect,
} from 'react'

import useSubformData from './useSubformData.js'

const useSubformEffect = ({
  errorMessages,
  groupValidations,
  // onChange,
  // onSubmit,
  updatedErrorMessages,
  // updatedValues,
  validations,
  // values,
}) => {
  const {
    addErrorMessages,
    addGroupValidations,
    addUpdatedErrorMessages,
    addValidations,
    removeErrorMessages,
    removeGroupValidations,
    removeUpdatedErrorMessages,
    removeValidations,
  } = (
    useSubformData()
  )

  useEffect(
    () => {
      if (errorMessages) {
        addErrorMessages(
          errorMessages
        )
      }
      else {
        removeErrorMessages()
      }

      return () => {
        removeErrorMessages()
      }
    },
    [
      addErrorMessages,
      errorMessages,
      removeErrorMessages,
    ]
  )

  useEffect(
    () => {
      if (groupValidations) {
        addGroupValidations(
          groupValidations
        )
      }
      else {
        removeGroupValidations()
      }

      return () => {
        removeGroupValidations()
      }
    },
    [
      addGroupValidations,
      groupValidations,
      removeGroupValidations,
    ]
  )

  useEffect(
    () => {
      if (updatedErrorMessages) {
        addUpdatedErrorMessages(
          updatedErrorMessages
        )
      }
      else {
        removeUpdatedErrorMessages()
      }

      return () => {
        removeUpdatedErrorMessages()
      }
    },
    [
      addUpdatedErrorMessages,
      removeUpdatedErrorMessages,
      updatedErrorMessages,
    ]
  )

  useEffect(
    () => {
      if (validations) {
        addValidations(
          validations
        )
      }
      else {
        removeValidations()
      }

      return () => {
        removeValidations()
      }
    },
    [
      addValidations,
      removeValidations,
      validations,
    ]
  )
}

export default useSubformEffect
