import {
	useCallback,
	useEffect,
} from 'react'

import useFieldData from './useFieldData.js'

const useField = ({
	name,
	onChange,
	onVisit,
}) => {
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
