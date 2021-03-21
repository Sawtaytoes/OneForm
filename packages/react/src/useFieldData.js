import useFieldErrorMessages from './useFieldErrorMessages.js'
import useFieldRegistration from './useFieldRegistration.js'
import useFieldValue from './useFieldValue.js'
import useFieldVisitation from './useFieldVisitation.js'

const useFieldData = ({
	fieldName,
}) => {
	const {
		errorMessages,
		setErrorMessages,
	} = (
		useFieldErrorMessages({
			fieldName,
		})
	)

	const {
		register,
	} = (
		useFieldRegistration({
			fieldName,
		})
	)

	const {
		setValue,
		value,
	} = (
		useFieldValue({
			fieldName,
		})
	)

	const {
		isVisited,
		setVisited,
	} = (
		useFieldVisitation({
			fieldName,
		})
	)

	return {
		errorMessages,
		isVisited,
		register,
		setErrorMessages,
		setValue,
		setVisited,
		value,
	}
}

export default useFieldData
