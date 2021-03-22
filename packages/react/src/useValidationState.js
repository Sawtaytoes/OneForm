import {
	useCallback,
	useEffect,
	useRef,
} from 'react'

const initialFieldGroupValidations = {}
const initialFieldValidations = {}
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
	const fieldValidationsRef = (
		useRef(
			initialFieldValidations
		)
	)

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
					),
				}
			},
			[
				groupValidations,
			],
		)
	)

	const getFieldValidation = (
		useCallback(
			(
				fieldName,
			) => {
				if (
					!(
						fieldValidationsRef
						.current
						[fieldName]
					)
				) {
					const [
						validationName,
						...groupStrings
					] = (
						fieldName
						.split(
							'/'
						)
					)

					const groupEntries = (
						groupStrings
						.map((
							groupString,
						) => (
							groupString
							.split(':')
						))
					)

					const groupsList = (
						groupEntries
						.map(([
							name,
							id,
						]) => ({
							id,
							name,
						}))
					)

					const groups = (
						Object
						.fromEntries(
							groupEntries
						)
					)

					fieldValidationsRef
					.current = {
						...(
							fieldValidationsRef
							.current
						),
						[fieldName]: {
							fieldName,
							groups,
							groupsList,
							validationName,
						},
					}
				}

				return (
					fieldValidationsRef
					.current
					[fieldName]
				)
			},
			[],
		)
	)

	const getFieldValidationErrorMessages = (
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
							getFieldValidation(
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
						) => {
							const groupsList = (
								(
									(
										groupValidation
										.groupNames
									)
									|| []
								)
								.map((
									groupName,
								) => ({
									groupId: (
										groups
										[groupName]
									),
									groupName: (
										groupName
									),
								}))
							)

							return {
								groupsList,
								groupValidation,
								isMissingGroupId: (
									groupsList
									.some(({
										groupId,
									}) => (
										!groupId
									))
								),
							}
						})
					))
					.flat()
					.map(({
						groupsList,
						groupValidation,
						isMissingGroupId,
					}) => {
						const fieldGroupStrings = (
							groupsList
							.map(({
								groupName,
							}) => (
								'/'
								.concat(
									groupName
								)
								.concat(
									':'
								)
							))
						)

						return (
							(
								(
									groupValidation
									.groupNames
								)
								&& (
									isMissingGroupId
								)
							)
							? (
								allFieldNames
								.filter((
									fieldName,
								) => (
									fieldGroupStrings
									.every((
										fieldGroupString,
									) => (
										fieldName
										.includes(
											fieldGroupString
										)
									))
								))
								.map((
									fieldName,
								) => (
									getFieldValidation(
										fieldName
									)
								))
								.map(({
									groups: fieldGroups,
								}) => ({
									groupsList: (
										groupsList
										.map(({
											groupName,
										}) => ({
											groupId: (
												fieldGroups
												[groupName]
											),
											groupName,
										}))
									),
									groupValidation,
								}))
							)
							: {
								groupsList,
								groupValidation,
							}
						)
					})
					.flat()
					.map(({
						groupsList,
						groupValidation,
					}) => {
						if (
							(
								groupsList
								.length
							)
							> 0
						) {
							const groupStrings = (
								groupsList
								.map(({
									groupId,
									groupName,
								}) => (
									'/'
									.concat(
										groupName
									)
									.concat(
										':'
									)
									.concat(
										groupId
									)
								))
							)

							const groupNameStrings = (
								groupsList
								.map(({
									groupId,
									groupName,
								}) => (
									'/'
									.concat(
										groupName
									)
									.concat(
										':'
									)
								))
							)

							return {
								groupsList,
								groupsListId: (
									groupStrings
									.join(
										''
									)
								),
								groupNameStrings,
								groupStrings,
								groupValidation,
							}
						}
						else {
							return {
								groupsList,
								groupsListId: '',
								groupStrings: [],
								groupValidation,
							}
						}
					})
					.reduce(
						(
							deduplicatedValidationGroupsMap,
							{
								groupsList,
								groupsListId,
								groupNameStrings,
								groupStrings,
								groupValidation,
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
										groupsListId: existingGroupsListId,
									}) => (
										existingGroupsListId
										=== groupsListId
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
												groupsList,
												groupsListId,
												groupNameStrings,
												groupStrings,
												validate: (
													groupValidation
													.validate
												),
												validationNames: (
													groupValidation
													.fieldNames
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
					.map(({
						groupNameStrings,
						groupStrings,
						validationNames,
						...otherProps
					}) => ({
						...otherProps,
						fieldGroups: (
							validationNames
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
											.startsWith(
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
										groupStrings
										.every((
											groupString,
											index,
										) => (
											!(
												fieldName
												.includes(
													groupNameStrings
													[index]
												)
											)
											|| (
												fieldName
												.includes(
													groupString
												)
											)
										))
									))
								)

								const validatingFieldNames = (
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
								)

								return {
									fields: (
										validatingFieldNames
										.map(
											getFieldValidation
										)
									),
									validationName,
								}
							})
						),
						groupStrings,
					}))
					.map(({
						fieldGroups,
						...otherProps
					}) => ({
						...otherProps,
						fieldGroups,
						fieldNames: (
							fieldGroups
							.map(({
								fields,
							}) => (
								fields
							))
							.flat()
							.map(({
								fieldName,
							}) => (
								fieldName
							))
						),
					}))
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
						fieldNames,
						groupStrings,
						...otherProps
					}) => ({
						...otherProps,
						reverseLookup: (
							Object
							.fromEntries(
								fieldNames
								.map((
									fieldName,
								) => ([
									(
										groupStrings
										.reduce(
											(
												strippedFieldName,
												groupString,
											) => (
												strippedFieldName
												.replace(
													groupString,
													'',
												)
											),
											fieldName,
										)
									),
									fieldName,
								]))
							)
						),
					}))
					.map(({
						fieldGroups,
						reverseLookup,
						validate,
					}) => ({
						reverseLookup,
						validate,
						values: (
							Object
							.fromEntries(
								fieldGroups
								.map(({
									fields,
									validationName,
								}) => ({
									fieldValues: (
										fields
										.map(({
											fieldName,
										}) => (
											fieldName
										))
										.map(
											getValue
										)
									),
									isSingleValueField: (
										reverseLookup
										[validationName]
									),
									validationName,
								}))
								.map(({
									fieldValues,
									isSingleValueField,
									validationName,
								}) => ([
									validationName,
									(
										isSingleValueField
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
				getFieldValidation,
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
		getFieldValidationErrorMessages,
	}
}

export default useValidationState
