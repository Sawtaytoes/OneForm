import {
	useCallback,
	useEffect,
	useRef,
} from 'react'

const initialFieldGroupValidations = {}
const initialGroupValidations = []
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
	const fieldGroupValidationsRef = (
		useRef(
			initialFieldGroupValidations
		)
	)

	const setupFieldGroupValidations = (
		useCallback(
			(
				identifier,
			) => {
				if (
					fieldGroupValidationsRef
					.current
					[identifier]
				) {
					return
				}

				fieldGroupValidationsRef
				.current
				[identifier] = (
					groupValidations
					.filter(({
						fieldNames,
					}) => (
						fieldNames
						.includes(
							identifier
						)
					))
				)
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

				identifiers
				.forEach(
					setupFieldGroupValidations
				)

				const validationErrorMessagePairs = (
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
					.map(({
						errorMessages,
						identifier,
					}) => ([
						identifier,
						errorMessages,
					]))
				)

				const allErrorMessages = (
					Array
					.from(
						new Set(
							identifiers
							.map((
								identifier,
							) => (
								fieldGroupValidationsRef
								.current
								[identifier]
							))
							.filter(
								Boolean
							)
							.flat()
							.filter(({
								fieldNames,
							}) => (
								fieldNames
								.every(
									getIsReadyForValidation
								)
							))
						)
					)
					.map(({
						fieldNames,
						// groupName,
						validate,
					}) => ({
						reverseLookup: {},
						validate,
						values: (
							Object
							.fromEntries(
								fieldNames
								.map((
									fieldName,
								) => ([
									fieldName,
									(
										getValue(
											fieldName
										)
									),
								]))
							)
						),
					}))
					.map(({
						reverseLookup,
						validate,
						values,
					}) => (
						validate({
							reverseLookup,
							validationType: (
								getValidationType()
							),
							values,
						})
					))
					.filter(
						Boolean
					)
					.flat()
					.reduce(
						(
							combinedErrorMessages,
							{
								errorMessage = ' ',
								fieldName,
							},
						) => ({
							...combinedErrorMessages,
							[fieldName]: (
								(
									(
										combinedErrorMessages
										[fieldName]
									)
									|| []
								)
								.concat(
									errorMessage
								)
							),
						}),
						(
							Object
							.fromEntries(
								validationErrorMessagePairs
							)
						)
					)
				)

				return (
					Object
					.entries(
						allErrorMessages
					)
					.map(([
						fieldName,
						errorMessages,
					]) => ({
						errorMessages,
						fieldName,
					}))
				)
			},
			[
				getIsReadyForValidation,
				getValidationType,
				getValue,
				setupFieldGroupValidations,
				validations,
			],
		)
	)

	useEffect(
		() => {
			fieldGroupValidationsRef
			.current = (
				initialGroupValidations
			)
		},
		[
			// We're listening to this value even if we don't use it.
			groupValidations,
		]
	)

	return {
		getValidationErrorMessages,
		setupFieldGroupValidations,
	}
}

export default useValidationState
