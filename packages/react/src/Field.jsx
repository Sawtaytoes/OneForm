import PropTypes from 'prop-types'
import {
	cloneElement,
	memo,
	useMemo,
} from 'react'

import useField from './useField.js'

const propTypes = {
	children: PropTypes.node.isRequired,
}

const Field = ({
	children,
}) => {
	const {
		name,
		onBlur: onChildBlur,
		onChange: onChildChange,
	} = (
		children
		.props
	)

	const {
		errorMessages,
		fieldName,
		fieldVisited,
		isVisited,
		value,
		valueChanged,
	} = (
		useField({
			name,
			onChange: (
				onChildChange
			),
			onVisit: (
				onChildBlur
			),
		})
	)

	const childProps = (
		useMemo(
			() => ({
				dirty: isVisited,
				error: (
					errorMessages
					[0]
				),
				errors: (
					errorMessages
				),
				name: fieldName,
				onBlur: fieldVisited,
				onChange: valueChanged,
				touched: isVisited,
				value,
				visited: isVisited,
			}),
			[
				errorMessages,
				fieldName,
				fieldVisited,
				isVisited,
				value,
				valueChanged,
			],
		)
	)

	return (
		cloneElement(
			children,
			childProps,
		)
	)
}

Field.propTypes = propTypes

const MemoizedField = memo(Field)

export default MemoizedField
