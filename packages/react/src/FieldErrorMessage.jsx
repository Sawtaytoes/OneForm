import PropTypes from 'prop-types'
import {
	memo,
} from 'react'

import useFieldErrorMessages from './useFieldErrorMessages'
import useFieldName from './useFieldName.js'

const propTypes = {
	name: PropTypes.string.isRequired,
}

const FieldErrorMessage = ({
	name,
}) => {
	const {
		fieldName,
	} = (
		useFieldName({
			name,
		})
	)

	const {
		errorMessages = [],
	} = (
		useFieldErrorMessages({
			fieldName,
		})
	)

	return (
		(
			errorMessages
			[0]
		)
		|| ''
	)
}

FieldErrorMessage.propTypes = propTypes

const MemoizedFieldErrorMessage = memo(FieldErrorMessage)

export default MemoizedFieldErrorMessage
