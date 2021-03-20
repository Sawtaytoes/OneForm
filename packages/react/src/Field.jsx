import PropTypes from 'prop-types'
import {
	cloneElement,
	memo,
	useMemo,
} from 'react'

import useField from './useField'

const propTypes = {
	children: PropTypes.node.isRequired,
}

const Field = ({
	children,
}) => {
	const {
		name,
		onChange: onChildChange,
	} = (
		children
		.props
	)

	const {
		errorMessages,
		value,
		valueChanged,
	} = (
		useField({
			name,
			onChange: (
				onChildChange
			),
		})
	)

	const childProps = (
		useMemo(
			() => ({
				error: (
					errorMessages
					[0]
				),
				errors: (
					errorMessages
				),
				name,
				onChange: valueChanged,
				value,
			}),
			[
				errorMessages,
				name,
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
