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
	fallback: PropTypes.node,
	getIsVisible: PropTypes.func,
	name: PropTypes.string.isRequired,
}

const FieldValue = ({
	children,
	fallback,
	getIsVisible = Boolean,
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

	const isVisible = (
		useMemo(
			() => (
				getIsVisible(
					value
				)
			),
			[
				getIsVisible,
				value,
			]
		)
	)

	return (
		isVisible
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
			fallback
			|| (
				childProps
				.children
			)
		)
	)
}

FieldValue.propTypes = propTypes

const MemoizedFieldValue = memo(FieldValue)

export default MemoizedFieldValue
