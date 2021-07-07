import useFieldErrorMessages from './useFieldErrorMessages.js'
import useFieldName from './useFieldName.js'
import useFieldRegistration from './useFieldRegistration.js'
import useFieldValue from './useFieldValue.js'
import useFieldVisitation from './useFieldVisitation.js'

const useFieldData = ({
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
    errorMessages,
    setErrorMessages,
  } = (
    useFieldErrorMessages({
      name,
    })
  )

  const {
    register,
  } = (
    useFieldRegistration({
      name,
    })
  )

  const {
    setValue,
    value,
  } = (
    useFieldValue({
      name,
    })
  )

  const {
    isVisited,
    setVisited,
  } = (
    useFieldVisitation({
      name,
    })
  )

  return {
    errorMessages,
    fieldName,
    isVisited,
    register,
    setErrorMessages,
    setValue,
    setVisited,
    value,
  }
}

export default useFieldData
