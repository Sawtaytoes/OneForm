import PropTypes from 'prop-types'
import {
	memo,
	useMemo,
} from 'react'

import ErrorMessagesContext from './ErrorMessagesContext.js'
import useObservableState from './useObservableState.js'
import ValuesContext from './ValuesContext.js'

const validationTypes = {
	CHANGE: 'CHANGE',
	SUBMIT: 'SUBMIT',
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
		getValue: getFieldErrorMessages,
		setValue: setFieldErrorMessages,
		subscribeToValue: subscribeToFieldErrorMessages,
	} = (
		useObservableState({
			updatedValues: updatedErrorMessages,
			values: errorMessages,
		})
	)

	const {
		getValue: getFieldValue,
		setValue: setFieldValue,
		subscribeToValue: subscribeToFieldValue,
	} = (
		useObservableState({
			onChange: ({
				identifier,
				values,
			}) => {
				onChange({
					changedFieldValue: identifier,
					values,
				})
			},
			updatedValues,
			values,
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

	return (
		<ErrorMessagesContext.Provider
			value={errorMessagesProviderValue}
		>
			<ValuesContext.Provider
				value={valuesProviderValue}
			>
				<form>
					{children}
				</form>
			</ValuesContext.Provider>
		</ErrorMessagesContext.Provider>
	)
}

OneForm.propTypes = propTypes

const MemoizedOneForm = memo(OneForm)

MemoizedOneForm.validationTypes = validationTypes

export default MemoizedOneForm