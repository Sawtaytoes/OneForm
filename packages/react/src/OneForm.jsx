import PropTypes from 'prop-types'
import {
	memo,
	useCallback,
	useMemo,
	useRef,
} from 'react'

import ErrorMessagesContext from './ErrorMessagesContext.js'
import FieldGroupContext from './FieldGroupContext.js'
import RegistrationContext from './RegistrationContext.js'
import SubmissionContext from './SubmissionContext.js'
import useObservableState from './useObservableState.js'
import useRegistrationState from './useRegistrationState.js'
import useSubmissionState from './useSubmissionState.js'
import useSubscriptionEffect from './useSubscriptionEffect.js'
import useValidationState from './useValidationState.js'
import useValidationType, {
	validationTypes,
} from './useValidationType.js'
import useVisitationState from './useVisitationState.js'
import ValuesContext from './ValuesContext.js'
import VisitationContext from './VisitationContext.js'

const propTypes = {
	children: PropTypes.node.isRequired,
	errorMessages: PropTypes.object,
	groupValidations: PropTypes.array,
	hasFieldChangeValidation: PropTypes.bool,
	onChange: PropTypes.func,
	onSubmit: PropTypes.func,
	updatedErrorMessages: PropTypes.object,
	updatedValues: PropTypes.object,
	validations: PropTypes.object,
	values: PropTypes.object,
}

const initialProps = {
	errorMessages: {},
	groupValidations: [],
	hasFieldChangeValidation: false,
	onChange: Function.prototype,
	onSubmit: Function.prototype,
	updatedErrorMessages: {},
	updatedValues: {},
	validations: {},
	values: {},
}

const OneForm = ({
	children,
	errorMessages = (
		initialProps
		.errorMessages
	),
	groupValidations = (
		initialProps
		.groupValidations
	),
	hasFieldChangeValidation = (
		initialProps
		.hasFieldChangeValidation
	),
	onChange = (
		initialProps
		.onChange
	),
	onSubmit = (
		initialProps
		.onSubmit
	),
	updatedErrorMessages = (
		initialProps
		.updatedErrorMessages
	),
	updatedValues = (
		initialProps
		.updatedValues
	),
	validations = (
		initialProps
		.validations
	),
	values = (
		initialProps
		.values
	),
}) => {
	const getValidationErrorMessagesRef = (
		useRef(
			Function
			.prototype
		)
	)

	const {
		getValidationType,
		setValidationTypeSubmit,
	} = (
		useValidationType()
	)

	const {
		getAllValues: getAllFieldErrorMessages,
		getValue: getFieldErrorMessages,
		setValue: setFieldErrorMessages,
		subscribeToValue: subscribeToFieldErrorMessages,
	} = (
		useObservableState({
			onPublish: ({
				identifier,
			}) => {
				setFieldVisited(
					identifier
				)
			},
			updatedValues: updatedErrorMessages,
			values: errorMessages,
		})
	)

	const updateErrorMessages = (
		useCallback(
			(
				identifiers,
			) => {
				if (
					(
						hasFieldChangeValidation
						&& (
							getValidationType()
							=== (
								validationTypes
								.change
							)
						)
					)
					|| (
						getValidationType()
						=== (
							validationTypes
							.submit
						)
					)
				) {
					getValidationErrorMessagesRef
					.current(
						identifiers
					)
					.forEach(({
						errorMessages,
						fieldName,
					}) => {
						setFieldErrorMessages(
							fieldName,
							errorMessages,
						)
					})
				}
			},
			[
				getValidationType,
				hasFieldChangeValidation,
				setFieldErrorMessages,
			],
		)
	)

	const {
		getAllValues: getAllFieldValues,
		getValue: getFieldValue,
		setValue: setFieldValue,
		subscribeToValue: subscribeToFieldValue,
	} = (
		useObservableState({
			onChange: ({
				identifier,
				values,
			}) => {
				const changedValues = (
					onChange({
						changedFieldValue: identifier,
						values,
					})
				)

				updateErrorMessages([
					identifier,
					...(
						changedValues
						? (
							Object
							.keys(
								changedValues
							)
						)
						: []
					),
				])

				return changedValues
			},
			updatedValues,
			values,
		})
	)

	const {
		getIsVisited: getIsFieldVisited,
		resetAllVisitations: resetAllFieldVisitations,
		setVisited: setFieldVisited,
		subscribeToIsVisited: subscribeToIsFieldVisited,
	} = (
		useVisitationState({
			onVisit: (
				identifier,
			) => {
				updateErrorMessages(
					identifier
				)
			},
		})
	)

	useSubscriptionEffect({
		subscriber: (
			resetAllFieldVisitations
		),
		value: (
			values
		),
	})

	const {
		getAllRegistrations: getAllFieldNameRegistrations,
		getIsRegistered: getIsFieldRegistered,
		register: registerFieldName,
	} = (
		useRegistrationState({
			onRegister: (
				identifier,
			) => {
				updateErrorMessages(
					identifier
				)
			},
		})
	)

	const {
		getValidationErrorMessages,
	} = (
		useValidationState({
			getIsReadyForValidation: (
				identifier,
			) => (
				(
					getIsFieldRegistered(
						identifier
					)
				)
				&& (
					getIsFieldVisited(
						identifier
					)
				)
			),
			getValidationType,
			getValue: (
				getFieldValue
			),
			groupValidations,
			validations,
		})
	)

	getValidationErrorMessagesRef
	.current = (
		getValidationErrorMessages
	)

	const validateAllFields = (
		useCallback(
			() => {
				updateErrorMessages(
					Object
					.keys(
						getAllFieldNameRegistrations()
					)
				)
			},
			[
				getAllFieldNameRegistrations,
				updateErrorMessages,
			],
		)
	)

	useSubscriptionEffect({
		subscriber: (
			validateAllFields
		),
		value: (
			groupValidations
		),
	})

	useSubscriptionEffect({
		subscriber: (
			validateAllFields
		),
		value: (
			validations
		),
	})

	const {
		formSubmitted,
		submissionState,
	} = (
		useSubmissionState({
			getAllIdentifiers: (
				getAllFieldNameRegistrations
			),
			getAllValues: (
				getAllFieldValues
			),
			getIsValid: () => {
				validateAllFields()

				return (
					(
						Object
						.keys(
							getAllFieldErrorMessages()
						)
						.length
					)
					=== 0
				)
			},
			onBeforeSubmit: () => {
				setValidationTypeSubmit()

				Object
				.keys(
					getAllFieldNameRegistrations()
				)
				.forEach(
					setFieldVisited
				)
			},
			onSubmit,
		})
	)

	const errorMessagesProviderValue = (
		useMemo(
			() => ({
				getFieldErrorMessages,
				setFieldErrorMessages,
				subscribeToFieldErrorMessages,
			}),
			[
				getFieldErrorMessages,
				setFieldErrorMessages,
				subscribeToFieldErrorMessages,
			],
		)
	)

	const fieldGroupProviderValue = (
		useMemo(
			() => ({
				fieldGroups: [],
			}),
			[],
		)
	)

	const registrationProviderValue = (
		useMemo(
			() => ({
				registerFieldName,
			}),
			[
				registerFieldName,
			],
		)
	)

	const submissionProviderValue = (
		useMemo(
			() => ({
				submissionState,
			}),
			[
				submissionState,
			],
		)
	)

	const valuesProviderValue = (
		useMemo(
			() => ({
				getFieldValue,
				setFieldValue,
				subscribeToFieldValue,
			}),
			[
				getFieldValue,
				setFieldValue,
				subscribeToFieldValue,
			],
		)
	)

	const visitationProviderValue = (
		useMemo(
			() => ({
				getIsFieldVisited,
				setFieldVisited,
				subscribeToIsFieldVisited,
			}),
			[
				getIsFieldVisited,
				setFieldVisited,
				subscribeToIsFieldVisited,
			],
		)
	)

	return (
		<ErrorMessagesContext.Provider
			value={errorMessagesProviderValue}
		>
			<FieldGroupContext.Provider
				value={fieldGroupProviderValue}
			>
				<RegistrationContext.Provider
					value={registrationProviderValue}
				>
					<SubmissionContext.Provider
						value={submissionProviderValue}
					>
						<ValuesContext.Provider
							value={valuesProviderValue}
						>
							<VisitationContext.Provider
								value={visitationProviderValue}
							>
								<form
									onSubmit={formSubmitted}
								>
									{children}
								</form>
							</VisitationContext.Provider>
						</ValuesContext.Provider>
					</SubmissionContext.Provider>
				</RegistrationContext.Provider>
			</FieldGroupContext.Provider>
		</ErrorMessagesContext.Provider>
	)
}

OneForm.propTypes = propTypes

const MemoizedOneForm = memo(OneForm)

export default MemoizedOneForm
