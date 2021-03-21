import {
	useCallback,
	useRef,
} from 'react'

export const validationTypes = {
	change: 'change',
	submit: 'submit',
}

const useValidationType = () => {
	const validationTypeRef = (
		useRef(
			validationTypes
			.change
		)
	)

	const getValidationType = (
		useCallback(
			() => (
				validationTypeRef
				.current
			),
			[],
		)
	)

	const setValidationTypeSubmit = (
		useCallback(
			() => (
				validationTypeRef
				.current = (
					validationTypes
					.submit
				)
			),
			[],
		)
	)

	return {
		getValidationType,
		setValidationTypeSubmit,
	}
}

export default useValidationType
