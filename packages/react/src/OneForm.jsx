import PropTypes from 'prop-types'
import {
	memo,
	useMemo,
} from 'react'

import OneFormErrorContext from './OneFormErrorContext.jsx'
import OneFormValueContext from './OneFormValueContext.jsx'
import useObservableState from './useObservableState.js'

const validationTypes = {
	CHANGE: 'CHANGE',
	SUBMIT: 'SUBMIT',
}

const propTypes = {
	errors: PropTypes.object,
	groupValidations: PropTypes.array,
	hasFieldChangeValidation: PropTypes.bool,
	onChange: PropTypes.func,
	onSubmit: PropTypes.func,
	updatedErrors: PropTypes.object,
	updatedValues: PropTypes.object,
	validations: PropTypes.object,
	values: PropTypes.object,
}

const initialProps = {
	errors: {},
	groupValidations: [],
	hasFieldChangeValidation: false,
	onChange: Function.prototype,
	onSubmit: Function.prototype,
	updatedErrors: {},
	updatedValues: {},
	validations: {},
	values: {},
}

const OneForm = ({
	errors = (
		initialProps
		.errors
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
	updatedErrors = (
		initialProps
		.updatedErrors
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
		getValue: getFieldValue,
		setValue: setFieldValue,
		subscribeToValue: subscribeToFieldValue,
	} = (
		useObservableState({
			updatedValues,
			values,
		})
	)

	const {
		getValue: getErrorMessages,
		setValue: setErrorMessages,
		subscribeToValue: subscribeToErrorMessages,
	} = (
		useObservableState({
			updatedValues: updatedErrors,
			values: errors,
		})
	)

	const errorProviderValue = (
		useMemo(
			() => ({
				getErrorMessages,
				setErrorMessages,
				subscribeToErrorMessages,
			}),
			[
				getErrorMessages,
				setErrorMessages,
				subscribeToErrorMessages,
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
		<OneFormErrorContext.Provider
			value={errorProviderValue}
		>
			<OneFormValueContext.Provider
				value={valueProviderValue}
			>
				<form>
					<div />
				</form>
			</OneFormValueContext.Provider>
		</OneFormErrorContext.Provider>
	)
}

OneForm.propTypes = propTypes

const MemoizedOneForm = memo(OneForm)

MemoizedOneForm.validationTypes = validationTypes

export default MemoizedOneForm
