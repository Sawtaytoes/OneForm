import PropTypes from 'prop-types'
import {
	cloneElement,
	memo,
	useCallback,
	useMemo,
} from 'react'

import useFieldValue from './useFieldValue'

const propTypes = {
	children: PropTypes.node.isRequired,
}

const FieldValue = ({
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
		useFieldValue({
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

FieldValue.propTypes = propTypes

const MemoizedFieldValue = memo(FieldValue)

export default MemoizedFieldValue
