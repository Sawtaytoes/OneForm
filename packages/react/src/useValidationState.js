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

	const setFieldGroupValidation = (
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

	// TODO: This is `getFieldValidationErrorMessages`.
	const getValidationErrorMessages = (
		useCallback(
			(
				// TODO: Now that we know about fields in this hook, we should use that knowledge to improve naming.
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

				// TODO: This needs to loop `validationNames`.
				identifiers
				.forEach(
					setFieldGroupValidation
				)

				const validationErrorMessagePairs = (
					identifiers
					.filter((
						identifier,
					) => (
						// TODO: This needs to be converted to an object with a `validationName` and `fieldName` before filtering.
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
											// TODO: This is the `validationName`.
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
						// TODO: This is the `fieldName`.
						identifier,
					}))
					.map(({
						errorMessages,
						identifier,
					}) => ([
						// TODO: Rename `identifier` to `fieldName`.
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
								// TODO: `identifier` needs to be a `validationName`, but we also need to match it against the `groupName`.
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
				setFieldGroupValidation,
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
	}
}

export default useValidationState
