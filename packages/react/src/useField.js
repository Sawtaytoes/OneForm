import {
	useCallback,
	useEffect,
} from 'react'

import useFieldData from './useFieldData.js'
import useIsHtmlElement from './useIsHtmlElement.js'

const checkboxRegex = (
	/.*checkbox.*/i
)

const useField = ({
	children,
}) => {
	const {
		name,
		onBlur: onVisit,
		onChange,
		value: radioValue,
	} = (
		children
		.props
	)

	const {
		errorMessages = [],
		fieldName,
		isVisited = false,
		register,
		setValue,
		setVisited,
		value = '',
	} = (
		useFieldData({
			name,
		})
	)

	const fieldVisited = (
		useCallback(
			(
				event,
			) => {
				setVisited()

				onVisit?.(
					event
				)
			},
			[
				onVisit,
				setVisited,
			],
		)
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

					setVisited()
				}
				else if (
					(
						event
						.target
						.type
					)
					=== 'radio'
				) {
					setVisited()

					setValue(
						radioValue
					)
				}
				else if (
					(
						event
						.target
						.type
					)
					=== 'select-multiple'
				) {
					setVisited()

					setValue(
						Array
						.from(
							event
							.target
							.selectedOptions
						)
						.map(({
							value,
						}) => (
							value
						))
					)
				}
				else if (
					(
						event
						.target
						.type
					)
					=== 'select-one'
				) {
					setVisited()

					setValue(
						event
						.target
						.value
					)
				}
				else {
					setValue(
						event
						.target
						.value
					)
				}

				onChange?.(
					event
				)
			},
			[
				onChange,
				radioValue,
				setValue,
				setVisited,
			],
		)
	)

	const isHtmlElement = (
		useIsHtmlElement(
			children
		)
	)

	useEffect(
		() => {
			const isCheckbox = (
				isHtmlElement
				? (
					(
						children
						.props
						.type
					)
					=== 'checkbox'
				)
				: (
					checkboxRegex
					.test(
						(
							children
							?.displayName
						)
						|| (
							children
							?.type
							?.displayName
						)
					)
				)
			)

			const isDefaultRadio = (
				isHtmlElement
				&& (
					(
						children
						.props
						.type
					)
					=== 'radio'
				)
				&& (
					children
					.props
					.defaultChecked
				)
			)

			if (
				isCheckbox
				|| isDefaultRadio
			) {
				setVisited()
			}
		},
		[
			children,
			isHtmlElement,
			setVisited,
		]
	)

	useEffect(
		() => {
			const unregister = (
				register()
			)

			return () => {
				unregister()
			}
		},
		[
			register,
		]
	)

	return {
		errorMessages,
		fieldName,
		fieldVisited,
		isHtmlElement,
		isVisited: (
			isVisited
			? 'true'
			: ''
		),
		value: (
			(
				(
					children
					.props
					.multiple
				)
				&& (
					value
					=== ''
				)
			)
			? []
			: value
		),
		valueChanged,
	}
}

export default useField
