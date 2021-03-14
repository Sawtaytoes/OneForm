import PropTypes from 'prop-types'
import {
	memo,
} from 'react'

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
	errors
	groupValidations
	hasFieldChangeValidation
	onChange
	onSubmit
	updatedErrors
	updatedValues
	validations
	values

	return (
		<form>
			<div />
		</form>
	)
}

OneForm.propTypes = propTypes

const MemoizedOneForm = memo(OneForm)

MemoizedOneForm.validationTypes = validationTypes

export default MemoizedOneForm
