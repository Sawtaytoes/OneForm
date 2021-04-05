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

	const isHtmlElement = (
		useMemo(
			() => (
				typeof (
					children
					.type
				)
				=== 'string'
			),
			[
				children,
			],
		)
	)

	const childProps = (
		useMemo(
			() => (
				isHtmlElement
				? {
					'data-error': (
						(
							(
								errorMessages
								.length
							)
							> 0
						)
						? 'true'
						: null
					),
					'data-visited': (
						isVisited
						? 'true'
						: null
					),
					'name': fieldName,
					'onBlur': fieldVisited,
					'onChange': valueChanged,
					value,
				}
				: {
					dirty: isVisited,
					error: (
						Boolean(
							errorMessages
							[0]
						)
					),
					errorMessages: (
						errorMessages
					),
					errors: (
						errorMessages
					),
					isDirty: isVisited,
					isTouched: isVisited,
					isVisited,
					name: fieldName,
					onBlur: fieldVisited,
					onChange: valueChanged,
					touched: isVisited,
					value,
					visited: isVisited,
				}
			),
			[
				errorMessages,
				fieldName,
				fieldVisited,
				isHtmlElement,
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
