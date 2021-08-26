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
  updatedValues,
  validations,
  values,
}) => {
  const {
    addErrorMessages,
    addGroupValidations,
    addUpdatedErrorMessages,
    addUpdatedValues,
    addValidations,
    addValues,
    removeErrorMessages,
    removeGroupValidations,
    removeUpdatedErrorMessages,
    removeUpdatedValues,
    removeValidations,
    removeValues,
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
      if (updatedValues) {
        addUpdatedValues(
          updatedValues
        )
      }
      else {
        removeUpdatedValues()
      }

      return () => {
        removeUpdatedValues()
      }
    },
    [
      addUpdatedValues,
      removeUpdatedValues,
      updatedValues,
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

  useEffect(
    () => {
      if (values) {
        addValues(
          values
        )
      }
      else {
        removeValues()
      }

      return () => {
        removeValues()
      }
    },
    [
      addValues,
      removeValues,
      values,
    ]
  )
}

export default useSubformEffect
