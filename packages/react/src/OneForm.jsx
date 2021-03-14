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
	onChange: PropTypes.func,
	onSubmit: PropTypes.func,
	validations: PropTypes.object,
	validationTypes: (
		PropTypes
		.oneOf(
			Object
			.keys(
				validationTypes
			)
		)
	),
	values: PropTypes.object,
}

const initialProps = {
	errors: {},
	groupValidations: [],
	onChange: Function.prototype,
	onSubmit: Function.prototype,
	validations: {},
	validationTypes: (
		validationTypes
		.CHANGE
	),
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
	onChange = (
		initialProps
		.onChange
	),
	onSubmit = (
		initialProps
		.onSubmit
	),
	validations = (
		initialProps
		.validations
	),
	validationTypes = (
		initialProps
		.validationTypes
	),
	values = (
		initialProps
		.values
	),
}) => {
	errors
	groupValidations
	onChange
	onSubmit
	validations
	validationTypes
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
