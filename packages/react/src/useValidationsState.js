import {
	useCallback,
} from 'react'

import useStrippedIdentifer from './useStrippedIdentifer'
import useUpdateEffect from './useUpdateEffect'

export const validationsSymbol = Symbol()

const initialValidations = {}

const useValidationsState = (
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
		setErrorMessages = (
			Function
			.prototype
		),
		validations = (
			initialValidations
		),
	} = {}
) => {
	const {
		getStrippedIdentifierData,
	} = (
		useStrippedIdentifer()
	)

	const getValidationErrorMessages = (
		useCallback(
			({
				identifier,
				strippedIdentifier,
			}) => (
				(
					(
						validations
						[strippedIdentifier]
					)
					|| []
				)
				.filter(({
					getIsValid,
				}) => (
					!(
						getIsValid({
							identifier,
							validationType: (
								getValidationType()
							),
							value: (
								getValue(
									identifier
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
			[
				getValidationType,
				getValue,
				validations,
			],
		)
	)

	const validate = (
		useCallback(
			(
				identifiers,
			) => {
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
				.map(({
					identifier,
					strippedIdentifier,
				}) => ({
					errorMessages: (
						getValidationErrorMessages({
							identifier,
							strippedIdentifier,
						})
					),
					identifier,
				}))
				.forEach(({
					errorMessages,
					identifier,
				}) => {
					setErrorMessages(
						identifier,
						{
							errorMessages,
							symbol: validationsSymbol,
						},
					)
				})
			},
			[
				getIsReadyForValidation,
				getStrippedIdentifierData,
				getValidationErrorMessages,
				setErrorMessages,
			],
		)
	)

	useUpdateEffect(
		() => {
			validate(
				getAllIdentifiers()
			)
		},
		[
			getAllIdentifiers,
			validate,
			// We're listening to this value to tigger an update even if we don't use it.
			validations,
		]
	)

	return {
		validate,
	}
}

export default useValidationsState
