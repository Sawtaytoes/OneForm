import {
	useCallback,
	useRef,
} from 'react'

const initialGroupValidations = {}
const initialIdentifierValidations = {}
const initialValidations = {}

const useValidationState = (
	{
		getIsReadyForValidation = (
			Function
			.prototype
		),
		getValidationType = (
			Function
			.prototype
		),
		getValue = (
			Function
			.prototype
		),
		groupValidations = (
			initialGroupValidations
		),
		validations = (
			initialValidations
		),
	} = {}
) => {
	const identifierValidationsRef = (
		useRef(
			initialIdentifierValidations
		)
	)

	const setupGroupValidations = (
		useCallback(
			(
				identifier,
			) => {
				// TODO: DO THIS FOR GROUP VALIDATIONS ONLY

				// identifierValidationsRef
				// .current
				// [identifier] = (
				// 	groupValidations
				// 	[identifier]
				// )
			},
			[
				groupValidations,
			],
		)
	)

	const getValidationErrorMessages = (
		useCallback(
			(
				unfilteredIdentifiers,
			) => {
				const identifiers = (
					(
						(
							Array
							.isArray(
								unfilteredIdentifiers
							)
						)
						? unfilteredIdentifiers
						: [
							unfilteredIdentifiers,
						]
					)
					.filter(
						getIsReadyForValidation
					)
				)

				const validationErrorMessages = (
					identifiers
					.filter((
						identifier,
					) => (
						validations
						[identifier]
					))
					.map((
						identifier,
					) => ({
						errorMessages: (
							validations
							[identifier]
							.filter(({
								validate,
							}) => (
								!(
									validate(
										getValue(
											identifier
										)
									)
								)
							))
							.map(({
								errorMessage,
							}) => (
								errorMessage
								|| ' '
							))
						),
						identifier,
					}))
				)

				// Array
				// .from(
				// 	new Set(
				// 		identifiers
				// 		.map((
				// 			identifier,
				// 		) => (
				// 			identifierValidationsRef
				// 			.current
				// 			[identifier]
				// 		))
				// 		.flat()
				// 	)
				// )
				// .filter(({
				// 	errorMessage
				// }) => (

				// ))

				return validationErrorMessages
			},
			[
				getValue,
				validations,
			],
		)
	)

	// useEffect for when validations updates

	return {
		getValidationErrorMessages,
		setupGroupValidations,
	}
}

export default useValidationState
