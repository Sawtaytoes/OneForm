import PropTypes from 'prop-types'
import {
	memo,
} from 'react'

import useFieldName from './useFieldName.js'
import useFieldValue from './useFieldValue'

const propTypes = {
	name: PropTypes.string.isRequired,
}

const FieldValue = ({
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
		value = '',
	} = (
		useFieldValue({
			fieldName,
		})
	)

	return (
		value
	)
}

FieldValue.propTypes = propTypes

const MemoizedFieldValue = memo(FieldValue)

export default MemoizedFieldValue
