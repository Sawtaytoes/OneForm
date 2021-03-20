import useFieldErrorMessages from './useFieldErrorMessages.js'
import useFieldValue from './useFieldValue.js'
import useFieldVisitation from './useFieldVisitation.js'

const useFieldData = ({
	name,
}) => {
	const {
		errorMessages,
		setErrorMessages,
	} = (
		useFieldErrorMessages({
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
		isVisited,
		setErrorMessages,
		setValue,
		setVisited,
		value,
	}
}

export default useFieldData
