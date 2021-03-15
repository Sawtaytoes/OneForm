import PropTypes from 'prop-types'
import {
	memo,
	useMemo,
} from 'react'

import ErrorMessagesStateContext from './ErrorMessagesStateContext.js'
import useObservableState from './useObservableState.js'
import ValuesStateContext from './ValuesStateContext.js'

const validationTypes = {
	CHANGE: 'CHANGE',
	SUBMIT: 'SUBMIT',
}

const propTypes = {
	children: PropTypes.node.isRequired,
	errorMessagesState: PropTypes.object,
	groupValidations: PropTypes.array,
	hasFieldChangeValidation: PropTypes.bool,
	onChange: PropTypes.func,
	onSubmit: PropTypes.func,
	updatedErrorMessagesState: PropTypes.object,
	updatedValuesState: PropTypes.object,
	validations: PropTypes.object,
	valuesState: PropTypes.object,
}

const initialProps = {
	errorMessagesState: {},
	groupValidations: [],
	hasFieldChangeValidation: false,
	onChange: Function.prototype,
	onSubmit: Function.prototype,
	updatedErrorMessagesState: {},
	updatedValuesState: {},
	validations: {},
	valuesState: {},
}

const OneForm = ({
	children,
	errorMessagesState = (
		initialProps
		.errorMessagesState
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
	updatedErrorMessagesState = (
		initialProps
		.updatedErrorMessagesState
	),
	updatedValuesState = (
		initialProps
		.updatedValuesState
	),
	validations = (
		initialProps
		.validations
	),
	valuesState = (
		initialProps
		.valuesState
	),
}) => {
	const {
		getValue: getFieldErrorMessages,
		setValue: setFieldErrorMessages,
		subscribeToValue: subscribeToFieldErrorMessages,
	} = (
		useObservableState({
			updatedValuesState: updatedErrorMessagesState,
			valuesState: errorMessagesState,
		})
	)

	const {
		getValue: getFieldValue,
		setValue: setFieldValue,
		subscribeToValue: subscribeToFieldValue,
	} = (
		useObservableState({
			updatedValuesState,
			valuesState,
		})
	)

	const errorProviderValue = (
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

	const valueProviderValue = (
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
		<ErrorMessagesStateContext.Provider
			value={errorProviderValue}
		>
			<ValuesStateContext.Provider
				value={valueProviderValue}
			>
				<form>
					{children}
				</form>
			</ValuesStateContext.Provider>
		</ErrorMessagesStateContext.Provider>
	)
}

OneForm.propTypes = propTypes

const MemoizedOneForm = memo(OneForm)

MemoizedOneForm.validationTypes = validationTypes

export default MemoizedOneForm
