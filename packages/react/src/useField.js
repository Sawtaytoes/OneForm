import useFieldErrorMessages from './useFieldErrorMessages.js'
import useFieldValue from './useFieldValue.js'

const useField = ({
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

	return {
		errorMessages,
		setErrorMessages,
		setValue,
		value,
	}
}

export default useField
