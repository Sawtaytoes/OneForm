import {
	useCallback,
	useEffect,
	useRef,
} from 'react'

const initialFieldGroupValidations = {}
const initialFieldValidations = {}
const initialGroupValidations = []
const initialValidations = {}
const initialValidateReturnValueTracker = new Map()

const useAllValidationState = (
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

	const validateReturnValueTrackerRef = (
		useRef(
			initialValidateReturnValueTracker
		)
	)

	const getFieldGroupValidation = (
		useCallback(
			(
				validationName,
			) => (
				fieldGroupValidationsRef
				.current
				[validationName]
			),
			[],
		)
	)

	const setFieldGroupValidation = (
		useCallback(
			(
				validationName,
			) => {
				if (
					getFieldGroupValidation(
						validationName
					)
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
				getFieldGroupValidation,
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
					.map(
						getFieldValidation
					)
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

				const validationErrors = (
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
								getIsValid,
							}) => (
								!(
									getIsValid({
										fieldName,
										validationType: (
											getValidationType()
										),
										value: (
											getValue(
												fieldName
											)
										),
									})
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
						getFieldGroupValidation(
							validationName
						)
					))
					.map(({
						groups,
						validationName,
					}) => (
						getFieldGroupValidation(
							validationName
						)
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
										(
											groups
											[groupName]
										)
										|| ''
									),
									groupName: (
										groupName
									),
								}))
							)

							return {
								fieldGroupStrings: (
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
								),
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
						fieldGroupStrings,
						groupsList,
						groupValidation,
						isMissingGroupId,
					}) => (
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
					))
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
								groupNameStrings,
								groupsList,
								groupsListId: (
									groupStrings
									.join(
										''
									)
								),
								groupStrings,
								groupValidation,
							}
						}
						else {
							return {
								groupNameStrings: [],
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
								groupNameStrings,
								groupsList,
								groupsListId,
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
												groupNameStrings,
												groupsList,
												groupsListId,
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
										fieldName
										.startsWith(
											validationName
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

				const groupValidationResults = (
					validatingValidationGroups
					.map(({
						fieldNames,
						groupStrings,
						...otherProps
					}) => ({
						...otherProps,
						fieldNames,
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
						fieldNames,
						reverseLookup,
						validate,
					}) => ({
						fieldNames,
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
									isSingleValueField: (
										reverseLookup
										[validationName]
									),
									validationFields: (
										fields
										.map(({
											fieldName,
										}) => ({
											name: fieldName,
											value: (
												getValue(
													fieldName,
												)
											),
										}))
									),
									validationName,
								}))
								.map(({
									isSingleValueField,
									validationFields,
									validationName,
								}) => ([
									validationName,
									(
										isSingleValueField
										? (
											validationFields
											[0]
											.value
										)
										: (
											validationFields
										)
									),
								]))
							)
						),
					}))
					.map(({
						fieldNames,
						reverseLookup,
						validate,
						values,
					}) => ({
						fieldNames,
						returnValues: (
							(
								(
									validate({
										reverseLookup,
										validationType: (
											getValidationType()
										),
										values,
									})
								)
								|| []
							)
							.map(({
								errorMessage = ' ',
								fieldName,
							}) => ({
								errorMessage,
								fieldName,
							}))
						),
						validate,
					}))
				)

				const modifiedGroupValidationResults = (
					groupValidationResults
					.map(({
						fieldNames,
						returnValues,
						validate,
					}) => {
						const previousValidateRuns = (
							(
								(
									validateReturnValueTrackerRef
									.current
									.get(
										validate
									)
								)
								|| []
							)
						)

						const validateRunIndex = (
							previousValidateRuns
							.findIndex(({
								fieldNames: previousFieldNames,
							}) => (
								fieldNames
								.every((
									fieldName
								) => (
									previousFieldNames
									.includes(
										fieldName
									)
								))
							))
						)

						if (validateRunIndex >= 0) {
							const changedReturnValues = (
								previousValidateRuns
								[validateRunIndex]
								.returnValues
								.map(({
									fieldName: previousFieldName,
								}) => {
									const {
										errorMessage,
									} = (
										(
											returnValues
											.find(({
												fieldName,
											}) => (
												fieldName
												=== previousFieldName
											))
										)
										|| {}
									)

									return {
										errorMessage,
										fieldName: previousFieldName,
									}
								})
							)

							const newReturnValues = (
								returnValues
								.filter(({
									fieldName,
								}) => (
									!(
										previousValidateRuns
										[validateRunIndex]
										.returnValues
										.find(({
											fieldName: previousFieldName,
										}) => (
											previousFieldName
											=== fieldName
										))
									)
								))
							)

							const validationResults = (
								changedReturnValues
								.concat(
									newReturnValues
								)
							)

							return {
								fieldNames,
								previousValidateRuns,
								returnValues,
								validate,
								validateRunIndex,
								validationResults,
							}
						}
						else {
							return {
								fieldNames,
								previousValidateRuns,
								returnValues,
								validate,
								validateRunIndex: null,
								validationResults: returnValues,
							}
						}
					})
				)

				modifiedGroupValidationResults
				.forEach(({
					fieldNames,
					previousValidateRuns,
					returnValues,
					validate,
					validateRunIndex,
				}) => {
					const nextValidateRuns = [
						...previousValidateRuns,
					]

					if (typeof validateRunIndex === 'number') {
						nextValidateRuns
						[validateRunIndex] = {
							fieldNames,
							returnValues,
						}
					}
					else {
						nextValidateRuns
						.push({
							fieldNames,
							returnValues,
						})
					}

					validateReturnValueTrackerRef
					.current
					.set(
						validate,
						nextValidateRuns,
					)
				})

				const groupValidationErrors = (
					modifiedGroupValidationResults
					.map(({
						validationResults,
					}) => (
						validationResults
					))
					.filter(
						Boolean
					)
					.flat()
				)

				const allErrorMessages = (
					groupValidationErrors
					.reduce(
						(
							combinedErrorMessages,
							{
								errorMessage,
								fieldName,
							},
						) => ({
							...combinedErrorMessages,
							[fieldName]: (
								errorMessage
								? (
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
								)
								: (
									(
										(
											combinedErrorMessages
											[fieldName]
										)
										|| []
									)
								)
							),
						}),
						(
							Object
							.fromEntries(
								validationErrors
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
				getFieldGroupValidation,
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

export default useAllValidationState
