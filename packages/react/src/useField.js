import {
	useCallback,
	useEffect,
	useMemo,
} from 'react'

import useFieldData from './useFieldData.js'

const useField = ({
	children,
}) => {
	const {
		name,
		onBlur: onVisit,
		onChange,

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
				setValue,
				setVisited,
			],
		)
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
		value,
		valueChanged,
	}
}

export default useField
