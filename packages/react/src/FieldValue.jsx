import PropTypes from 'prop-types'
import {
	Children,
	cloneElement,
	memo,
	useMemo,
} from 'react'

import useFieldValue from './useFieldValue'

const propTypes = {
	children: PropTypes.node,
	name: PropTypes.string.isRequired,
}

const FieldValue = ({
	children,
	name,
}) => {
	const {
		value = '',
	} = (
		useFieldValue({
			name,
		})
	)

	const childProps = (
		useMemo(
			() => ({
				children: value,
			}),
			[
				value,
			]
		)
	)

	return (
		value
		? (
			children
			? (
				cloneElement(
					(
						Children
						.only(
							children
						)
					),
					childProps,
				)
			)
			: (
				childProps
				.children
			)
		)
		: (
			value
		)
	)
}

FieldValue.propTypes = propTypes

const MemoizedFieldValue = memo(FieldValue)

export default MemoizedFieldValue
