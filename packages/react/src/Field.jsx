import PropTypes from 'prop-types'
import {
	Children,
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
		errorMessages,
		fieldName,
		isChecked,
		isHtmlElement,
		isVisited,
		value,
		valueChanged,
	} = (
		useField({
			children,
		})
	)

	const childProps = (
		useMemo(
			() => (
				isHtmlElement
				? {
					'checked': isChecked,
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
					checked: isChecked,
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
					isChecked,
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
				isChecked,
				isHtmlElement,
				isVisited,
				value,
				valueChanged,
			],
		)
	)

	return (
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
}

Field.propTypes = propTypes

const MemoizedField = memo(Field)

export default MemoizedField
