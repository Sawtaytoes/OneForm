import {
	useCallback,
	useEffect,
} from 'react'

import useFieldData from './useFieldData.js'
import useFieldName from './useFieldName.js'

const useField = ({
	name,
	onChange,
	onVisit,
}) => {
	const {
		fieldName,
	} = (
		useFieldName({
			name,
		})
	)

	const {
		errorMessages = [],
		isVisited = false,
		register,
		setValue,
		setVisited,
		value = '',
	} = (
		useFieldData({
			fieldName,
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
			String(
				isVisited
			)
		),
		value,
		valueChanged,
	}
}

export default useField
