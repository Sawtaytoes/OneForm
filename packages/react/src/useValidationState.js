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
		getAllFieldNames = (
			Function
			.prototype
		),
		getIsFieldReadyForValidation = (
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
				validationName,
			) => {
				if (
					fieldGroupValidationsRef
					.current
					[validationName]
				) {
					return
				}

				fieldGroupValidationsRef
				.current = {
					...(
						fieldGroupValidationsRef
						.current
					),
					[validationName]: (
						groupValidations
						.filter(({
							fieldNames: validationNames,
						}) => (
							validationNames
							.includes(
								validationName
							)
						))
					)
				}
			},
			[
				groupValidations,
			],
		)
	)

	// TODO: Cache this on field registration so it doesn't have to be looked up each time.
	const getFieldValidationData = (
		useCallback(
			(
				fieldName,
			) => {
				const [
					validationName,
					...groupStrings
				] = (
					fieldName
					.split(
						'/'
					)
				)

				const groups = (
					groupStrings
					.map((
						groupString,
					) => (
						groupString
						.split(':')
					))
					.map(([
						name,
						value,
					]) => ({
						name,
						value,
					}))
				)

				return {
					fieldName,
					groups,
					validationName,
				}
			},
			[],
		)
	)

	// TODO: This is `getFieldValidationErrorMessages`.
	const getValidationErrorMessages = (
		useCallback(
			(
				changedFieldNames,
			) => {
				const validatingFields = (
					(
						(
							Array
							.isArray(
								changedFieldNames
							)
						)
						? changedFieldNames
						: [
							changedFieldNames,
						]
					)
					.filter(
						getIsFieldReadyForValidation
					)
					.map((
						fieldName,
					) => ({
						...(
							getFieldValidationData(
								fieldName
							)
						),
						fieldName,
					}))
				)

				validatingFields
				.map(({
					validationName,
				}) => (
					validationName
				))
				.forEach(
					setFieldGroupValidation
				)

				const validationErrorMessagePairs = (
					validatingFields
					.filter(({
						validationName,
					}) => (
						validations
						[validationName]
					))
					.map(({
						fieldName,
						validationName,
					}) => ({
						errorMessages: (
							validations
							[validationName]
							.filter(({
								validate,
							}) => (
								!(
									validate(
										getValue(
											fieldName
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
						fieldName,
					}))
					.map(({
						errorMessages,
						fieldName,
					}) => ([
						fieldName,
						errorMessages,
					]))
				)

				const allFieldNames = (
					getAllFieldNames()
				)

				const deduplicatedValidationGroupsMap = (
					validatingFields
					.filter(({
						validationName,
					}) => (
						fieldGroupValidationsRef
						.current
						[validationName]
					))
					.map(({
						groups,
						validationName,
					}) => (
						fieldGroupValidationsRef
						.current
						[validationName]
						.map((
							groupValidation,
						) => ({
							groups,
							groupValidation,
							hasGroups: (
								(
									groups
									.length
								)
								> 0
							),
						}))
					))
					.flat()
					.map(({
						groups,
						groupValidation,
						hasGroups,
					}) => {
						const fieldGroupString = (
							'/'
							.concat(
								groupValidation
								.groupName
							)
							.concat(
								':'
							)
						)

						return (
							(
								(
									groupValidation
									.groupName
								)
								&& (
									!hasGroups
								)
							)
							? (
								allFieldNames
								.filter((
									fieldName,
								) => (
									fieldName
									.includes(
										fieldGroupString
									)
								))
								.map((
									fieldName,
								) => (
									getFieldValidationData(
										fieldName
									)
								))
								.map(({
									groups: fieldGroups,
								}) => ({
									groups: fieldGroups,
									groupValidation,
									hasGroups: true,
								}))
							)
							: {
								groups,
								groupValidation,
								hasGroups,
							}
						)
					})
					.flat()
					.map(({
						groups,
						groupValidation,
						hasGroups,
					}) => {
						if (hasGroups) {
							const groupValue = (
								(
									groups
									.find(({
										name,
									}) => (
										name
										=== (
											groupValidation
											.groupName
										)
									))
									.value
								)
							)

							const groupString = (
								'/'
								.concat(
									groupValidation
									.groupName
								)
								.concat(
									':'
								)
								.concat(
									groupValue
								)
							)

							return {
								groupString,
								groupValidation,
								groupValue,
							}
						}
						else {
							return {
								groupString: '',
								groupValidation,
								groupValue: '',
							}
						}
					})
					.map(({
						groupString,
						groupValidation,
						...otherProps
					}) => ({
						...otherProps,
						fieldNameGroups: (
							groupValidation
							// These are exposed as `fieldNames` when internally, they're `validationNames`.
							.fieldNames
							.map((
								validationName
							) => {
								const fieldNames = (
									allFieldNames
									.filter((
										fieldName,
									) => (
										(
											fieldName
											.includes(
												validationName
											)
										)
									))
								)

								const groupedFieldNames = (
									fieldNames
									.filter((
										fieldName,
									) => (
										fieldName
										.includes(
											groupString
										)
									))
								)

								return {
									fieldNames: (
										(
											(
												groupedFieldNames
												.length
											)
											> 0
										)
										? (
											groupedFieldNames
										)
										: (
											fieldNames
										)
									),
									validationName,
								}
							})
						),
						groupString,
						groupValidation,
					}))
					.reduce(
						(
							deduplicatedValidationGroupsMap,
							{
								fieldNameGroups,
								groupString,
								groupValidation,
								groupValue,
							},
						) => {
							const existingGroupValidations = (
								deduplicatedValidationGroupsMap
								.get(
									groupValidation
								)
							)

							if (
								existingGroupValidations
								&& (
									existingGroupValidations
									.find(({
										groupValue: groupDataValue,
									}) => (
										groupDataValue
										=== groupValue
									))
								)
							) {
								return (
									deduplicatedValidationGroupsMap
								)
							}
							else {
								return (
									new Map(
										deduplicatedValidationGroupsMap
									)
									.set(
										groupValidation,
										(
											(
												existingGroupValidations
												|| []
											)
											.concat({
												fieldNameGroups,
												fieldNames: (
													fieldNameGroups
													.map(({
														fieldNames,
													}) => (
														fieldNames
													))
													.flat()
												),
												groupName: (
													groupValidation
													.groupName
												),
												groupString,
												groupValue,
												validate: (
													groupValidation
													.validate
												),
											})
										),
									)
								)
							}
						},
						new Map(),
					)
				)

				const validatingValidationGroups = (
					Array
					.from(
						deduplicatedValidationGroupsMap
						.values()
					)
					.flat()
					.filter(({
						fieldNames,
					}) => (
						fieldNames
						.every(
							getIsFieldReadyForValidation
						)
					))
				)

				const groupValidationErrorMessagePairs = (
					validatingValidationGroups
					.map(({
						fieldNameGroups,
						fieldNames,
						groupString,
						validate,
					}) => ({
						reverseLookup: (
							Object
							.fromEntries(
								fieldNames
								.map((
									fieldName,
								) => ([
									(
										fieldName
										.replace(
											groupString,
											'',
										)
									),
									fieldName,
								]))
							)
						),
						validate,
						values: (
							Object
							.fromEntries(
								fieldNameGroups
								.map(({
									fieldNames,
									validationName,
								}) => ({
									fieldValues: (
										fieldNames
										.map(
											getValue
										)
									),
									validationName,
								}))
								.map(({
									fieldValues,
									validationName,
								}) => ([
									validationName,
									(
										(
											fieldValues
											.length
											=== 1
										)
										? (
											fieldValues
											[0]
										)
										: (
											fieldValues
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
				)

				const allErrorMessages = (
					groupValidationErrorMessagePairs
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
				getAllFieldNames,
				getFieldValidationData,
				getIsFieldReadyForValidation,
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
