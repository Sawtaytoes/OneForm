import PropTypes from 'prop-types'
import {
	memo,
	useMemo,
} from 'react'

import ErrorMessagesContext from './ErrorMessagesContext.js'
import RegistrationContext from './RegistrationContext.js'
import useObservableState from './useObservableState.js'
import useRegistrationState from './useRegistrationState.js'
import useSubscriptionEffect from './useSubscriptionEffect.js'
import useVisitationState from './useVisitationState.js'
import ValuesContext from './ValuesContext.js'
import VisitationContext from './VisitationContext.js'

const validationTypes = {
	change: 'change',
	submit: 'submit',
}

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
	const {
		getIsVisited: getIsFieldVisited,
		resetAllVisitations: resetAllFieldVisitations,
		setVisited: setFieldVisited,
		subscribeToIsVisited: subscribeToIsFieldVisited,
	} = (
		useVisitationState()
	)

	const {
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
			}) => (
				onChange({
					changedFieldValue: identifier,
					values,
				})
			),
			updatedValues,
			values,
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
		register: registerFieldName,
	} = (
		useRegistrationState()
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
		<RegistrationContext.Provider
			value={registrationProviderValue}
		>
			<ErrorMessagesContext.Provider
				value={errorMessagesProviderValue}
			>
				<ValuesContext.Provider
					value={valuesProviderValue}
				>
					<VisitationContext.Provider
						value={visitationProviderValue}
					>
						<form>
							{children}
						</form>
					</VisitationContext.Provider>
				</ValuesContext.Provider>
			</ErrorMessagesContext.Provider>
		</RegistrationContext.Provider>
	)
}

OneForm.propTypes = propTypes

const MemoizedOneForm = memo(OneForm)

MemoizedOneForm.validationTypes = validationTypes

export default MemoizedOneForm
