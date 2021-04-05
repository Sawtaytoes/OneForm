import PropTypes from 'prop-types'
import {
	Children,
	cloneElement,
	memo,
	useMemo,
} from 'react'

import useFieldErrorMessages from './useFieldErrorMessages'

const propTypes = {
	children: PropTypes.node,
	name: PropTypes.string.isRequired,
}

const FieldErrorMessage = ({
	children,
	name,
}) => {
	const {
		errorMessages = [],
	} = (
		useFieldErrorMessages({
			name,
		})
	)

	const childProps = (
		useMemo(
			() => ({
				children: (
					(
						errorMessages
						[0]
					)
					|| ''
				),
			}),
			[
				errorMessages,
			]
		)
	)

	return (
		(
			children
			&& (
				Children
				.only(
					children
				)
			)
		)
		? (
			cloneElement(
				children,
				childProps,
			)
		)
		: (
			childProps
			.children
		)
	)
}

FieldErrorMessage.propTypes = propTypes

const MemoizedFieldErrorMessage = memo(FieldErrorMessage)

export default MemoizedFieldErrorMessage
