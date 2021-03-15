import PropTypes from 'prop-types'
import {
	cloneElement,
	memo,
	useCallback,
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
		setValue,
		value = '',
	} = (
		useField({
			name,
		})
	)

	const valueChanged = (
		useCallback(
			(
				event,
			) => {
				if (
					(
						event
						.target
						.type
					)
					=== 'checkbox'
				) {
					setValue(
						event
						.target
						.checked
					)
				}
				else {
					setValue(
						event
						.target
						.value
					)
				}

				onChildChange?.(
					event
				)
			},
			[
				onChildChange,
				setValue,
			],
		)
	)

	const childProps = (
		useMemo(
			() => ({
				name,
				onChange: valueChanged,
				value,
			}),
			[
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
