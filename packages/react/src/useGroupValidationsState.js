import {
	useCallback,
	useMemo,
	useRef,
} from 'react'

import useItemGroupState from './useItemGroupState'
import useStrippedIdentifer from './useStrippedIdentifer'
import useFilteredValuesState from './useFilteredValuesState'
import useSymbolFunctionStore from './useSymbolFunctionStore'
import useUpdateEffect from './useUpdateEffect'

const grouplessGroup = {
	groupId: '',
	groupName: '',
	groupString: '',
}

const grouplessGroupValidationGroup = [
	{
		group: (
			grouplessGroup
		),
		groupName: (
			grouplessGroup
			.groupName
		),
	},
]

const initialGroupValidations = []
const initialRegisteredIdentifiers = new Set()

const useGroupValidationsState = (
	{
		getAllIdentifiers = (
			Function
			.prototype
		),
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
		setErrorMessages = (
			Function
			.prototype
		),
	} = {}
) => {
	const {
		getStrippedIdentifierData,
	} = (
		useStrippedIdentifer()
	)

	const registeredIdentifiersRef = (
		useRef(
			initialRegisteredIdentifiers
		)
	)

	const {
		getAllValues: getAllPreviousErrorMessages,
		getSymbol: getErrorMessagesSymbol,
		getValue: getPreviousErrorMessages,
		resetValues: resetPreviousErrorMessages,
		setValue: setPreviousErrorMessages,
	} = (
		useSymbolFunctionStore()
	)

	const {
		getItemGroup,
		resetItemGroups,
		setItemGroup,
	} = (
		useItemGroupState()
	)

	const groupValidationsList = (
		useMemo(
			() => (
				groupValidations
				.map((
					groupValidation
				) => ({
					identifiers: (
						groupValidation
						.fieldNames
					),
					value: (
						groupValidation
					),
				}))
			),
			[
				groupValidations,
			],
		)
	)

	const {
		getFilteredValue: getSubscribedGroupValidation,
		resetFilteredValues: resetSubscribedGroupValidations,
		setFilteredValue: setSubscribedGroupValidation,
	} = (
		useFilteredValuesState({
			identifiersList: (
				groupValidationsList
			),
		})
	)

	const registerIdentifierForGroupValidation = (
		useCallback(
			(
				identifier,
			) => {
				if (
					registeredIdentifiersRef
					.current
					.has(
						identifier
					)
				) {
					return
				}

				registeredIdentifiersRef
				.current = (
					new Set(
						registeredIdentifiersRef
						.current
					)
					.add(
						identifier
					)
				)

				const strippedIdentifierData = (
					getStrippedIdentifierData(
						identifier
					)
				)

				const {
					groupsList,
					strippedIdentifier,
				} = (
					strippedIdentifierData
				)

				setSubscribedGroupValidation({
					identifier,
					listIdentifier: (
						strippedIdentifier
					),
				})

				setItemGroup({
					groupIdentifiers: (
						groupsList
						.concat(
							grouplessGroup
						)
					),
					item: (
						strippedIdentifierData
					),
				})
			},
			[
				getStrippedIdentifierData,
				setItemGroup,
				setSubscribedGroupValidation,
			],
		)
	)

	const getIdentifierGroups = (
		useCallback(
			({
				groupValidation,
				groupValidationGroups,
			}) => {
				const missingGroupNames = (
					groupValidationGroups
					.filter(({
						group,
					}) => (
						!group
					))
					.map(({
						groupName,
					}) => (
						groupName
					))
				)

				const knowngroupIdentifiers = (
					groupValidationGroups
					.filter(({
						group,
					}) => (
						group
					))
				)

				const identifierCategories = (
					Array
					.from(
						new Set(
							(
								(
									(
										knowngroupIdentifiers
										.length
									)
									> 0
								)
								? (
									knowngroupIdentifiers
								)
								: (
									grouplessGroupValidationGroup
								)
							)
							.map(({
								group,
							}) => (
								Array
								.from(
									getItemGroup(
										group
									)
								)
							))
							.flat()
						)
					)
					.filter((
						identifierData,
					) => (
						(
							groupValidation
							.fieldNames
							.includes(
								identifierData
								.strippedIdentifier
							)
						)
						&& (
							knowngroupIdentifiers
							.every(({
								group,
								groupName,
							}) => (
								!(
									identifierData
									.groups
									[groupName]
								)
								|| (
									identifierData
									.groupsList
									.includes(
										group
									)
								)
							))
						)
					))
					.map((
						identifierData,
					) => ({
						hasAllGroups: (
							missingGroupNames
							.every((
								missingGroupName
							) => (
								identifierData
								.groups
								[missingGroupName]
							))
						),
						identifierData,
					}))
					.reduce(
						(
							identifierCategories,
							{
								hasAllGroups,
								identifierData,
							},
						) => ({
							...identifierCategories,
							[hasAllGroups]: (
								(
									(
										identifierCategories
										[hasAllGroups]
									)
									|| []
								)
								.concat(
									identifierData
								)
							),
						}),
						{
							false: [],
							true: [],
						},
					)
				)

				const identifierGroups = (
					(
						(
							(
								identifierCategories
								[false]
								.length
							)
							=== 0
						)
						? [
							(
								identifierCategories
								[true]
							),
						]
						: (
							(
								(
									(
										identifierCategories
										[true]
										.length
									)
									> 0
								)
								? (
									identifierCategories
									[true]
									.map((
										identifierData,
									) => (
										[
											identifierData,
										]
										.concat(
											identifierCategories
											[false]
										)
									))
								)
								: [
									(
										identifierCategories
										[false]
									),
								]
							)
						)
					)
					.filter((
						identifierGroup,
					) => (
						identifierGroup
						.every(({
							identifier,
						}) => (
							getIsReadyForValidation(
								identifier
							)
						))
					))
					.map((
						identifierGroup,
					) => ({
						groupsList: (
							groupValidationGroups
							.filter(
								Boolean
							)
							.map(({
								groupName,
							}) => (
								identifierGroup
								.find(({
									groups,
								}) => (
									groups
									[groupName]
								))
								?.groups
								?.[groupName]
							))
							.filter(
								Boolean
							)
						),
						groupValidation,
						identifierGroup,
					}))
					.map(({
						groupsList,
						...otherProps
					}) => ({
						...otherProps,
						groupsList,
						groupsString: (
							groupsList
							.map(({
								groupString,
							}) => (
								groupString
							))
							.join('')
						),
					}))
				)

				return (
					identifierGroups
				)
			},
			[
				getItemGroup,
				getIsReadyForValidation,
			],
		)
	)

	const getValidationGroups = (
		useCallback(
			({
				groups,
				identifier,
			}) => (
				getSubscribedGroupValidation(
					identifier
				)
				.map((
					groupValidation,
				) => ({
					groupValidation,
					groupValidationGroups: (
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
							group: (
								groups
								[groupName]
							),
							groupName,
						}))
					),
				}))
				.map(({
					groupValidation,
					groupValidationGroups,
				}) => ({
					groupValidation,
					groupValidationGroups: (
						(
							(
								groupValidationGroups
								.length
							)
							> 0
						)
						? (
							groupValidationGroups
						)
						: (
							grouplessGroupValidationGroup
						)
					),
				}))
				.map(
					getIdentifierGroups
				)
				.flat()
			),
			[
				getIdentifierGroups,
				getSubscribedGroupValidation,
			],
		)
	)

	const getValidationErrorMessages = (
		useCallback(
			({
				groupsList,
				groupsString,
				groupValidation,
				identifierGroup,
			}) => {
				const groups = (
					Object
					.fromEntries(
						groupsList
						.map(({
							groupId,
							groupName,
							groupString,
						}) => ([
							groupName,
							{
								groupId,
								groupName,
								groupString,
							},
						]))
					)
				)

				const reverseLookup = (
					Object
					.fromEntries(
						identifierGroup
						.map(({
							identifier,
							strippedIdentifier,
						}) => ({
							identifier,
							strippedGroupIdentifier: (
								groupsList
								.reduce(
									(
										strippedGroupIdentifier,
										{
											groupString,
										},
									) => (
										strippedGroupIdentifier
										.replace(
											groupString,
											'',
										)
									),
									identifier,
								)
							),
							strippedIdentifier,
						}))
						.filter(({
							strippedGroupIdentifier,
							strippedIdentifier,
						}) => (
							strippedGroupIdentifier
							=== strippedIdentifier
						))
						.map(({
							identifier,
							strippedIdentifier,
						}) => ([
							strippedIdentifier,
							identifier,
						]))
					)
				)

				const values = (
					Object
					.fromEntries(
						groupValidation
						.fieldNames
						.map((
							fieldName,
						) => ({
							identifiers: (
								identifierGroup
								.filter(({
									strippedIdentifier,
								}) => (
									strippedIdentifier
									=== fieldName
								))
							),
							strippedIdentifier: (
								fieldName
							),
						}))
						.map(({
							identifiers,
							strippedIdentifier,
						}) => ({
							identifiers: (
								identifiers
								.map(({
									identifier,
								}) => ({
									name: identifier,
									value: (
										getValue(
											identifier,
										)
									),
								}))
							),
							isSingleValueField: (
								reverseLookup
								[strippedIdentifier]
							),
							strippedIdentifier,
						}))
						.map(({
							identifiers,
							isSingleValueField,
							strippedIdentifier,
						}) => ([
							strippedIdentifier,
							(
								isSingleValueField
								? (
									identifiers
									[0]
									.value
								)
								: (
									identifiers
								)
							),
						]))
					)
				)

				const validatedErrorMessages = (
					(
						groupValidation
						.getErrorMessages({
							groups,
							groupsString,
							reverseLookup,
							validationType: (
								getValidationType()
							),
							values,
						})
					)
					|| {}
				)

				const symbol = (
					getErrorMessagesSymbol({
						groupValidation,
						identifierGroup,
					})
				)

				const previousErrorMessages = (
					getPreviousErrorMessages({
						func: (
							groupValidation
							.getErrorMessages
						),
						symbol,
					})
				)

				setPreviousErrorMessages({
					errorMessages: (
						validatedErrorMessages
					),
					func: (
						groupValidation
						.getErrorMessages
					),
					symbol,
				})

				const formattedErrorMessages = (
					Object
					.entries({
						...previousErrorMessages,
						...validatedErrorMessages,
					})
					.map(([
						identifier,
						errorMessages,
					]) => ({
						errorMessages: (
							(
								previousErrorMessages
								[identifier]
							)
							&& (
								!(
									validatedErrorMessages
									[identifier]
								)
							)
							? (
								[]
							)
							: (
								errorMessages
							)
						),
						identifier,
					}))
					.map(({
						errorMessages,
						identifier,
					}) => ({
						error: {
							errorMessages,
							symbol,
						},
						identifier,
					}))
				)

				return (
					formattedErrorMessages
				)
			},
			[
				getPreviousErrorMessages,
				getErrorMessagesSymbol,
				getValidationType,
				getValue,
				setPreviousErrorMessages,
			],
		)
	)

	const validateGroups = (
		useCallback(
			(
				identifiers,
			) => {
				const deduplicatedValidationGroups = (
					(
						(
							Array
							.isArray(
								identifiers
							)
						)
						? identifiers
						: [
							identifiers,
						]
					)
					.filter(
						getIsReadyForValidation
					)
					.map(
						getStrippedIdentifierData
					)
					.map(
						getValidationGroups
					)
					.flat()
					.reduce(
						(
							deduplicatedValidationGroups,
							{
								groupsList,
								groupsString,
								groupValidation,
								identifierGroup,
							},
						) => {
							const groupValidationIdentifierGroups = (
								(
									deduplicatedValidationGroups
									.get(
										groupValidation
									)
								)
								|| []
							)

							return (
								(
									groupValidationIdentifierGroups
									.some(({
										groupsString: identifierGroupsString,
									}) => (
										identifierGroupsString
										=== groupsString
									))
								)
								? (
									deduplicatedValidationGroups
								)
								: (
									new Map(
										deduplicatedValidationGroups
									)
									.set(
										groupValidation,
										(
											groupValidationIdentifierGroups
											.concat({
												groupsList,
												groupsString,
												groupValidation,
												identifierGroup,
											})
										)
									)
								)
							)
						},
						new Map(),
					)
				)

				Array
				.from(
					deduplicatedValidationGroups
					.values()
				)
				.flat()
				.map(
					getValidationErrorMessages
				)
				.flat()
				.forEach(({
					error,
					identifier,
				}) => {
					setErrorMessages(
						identifier,
						error,
					)
				})
			},
			[
				getIsReadyForValidation,
				getStrippedIdentifierData,
				getValidationErrorMessages,
				getValidationGroups,
				setErrorMessages,
			],
		)
	)

	useUpdateEffect(
		() => {
			getAllPreviousErrorMessages()
			.forEach(({
				identifier,
				symbol,
			}) => {
				setErrorMessages(
					identifier,
					{
						errorMessages: [],
						symbol,
					}
				)
			})

			resetPreviousErrorMessages()
			resetItemGroups()
			resetSubscribedGroupValidations()

			getAllIdentifiers()
			.forEach(
				registerIdentifierForGroupValidation
			)
		},
		[
			getAllIdentifiers,
			groupValidations, // We're listening to this value to tigger an update even if we don't use it.
			registerIdentifierForGroupValidation,
			resetItemGroups,
			resetPreviousErrorMessages,
			setErrorMessages,
		]
	)

	return {
		registerIdentifierForGroupValidation,
		validateGroups,
	}
}

export default useGroupValidationsState
