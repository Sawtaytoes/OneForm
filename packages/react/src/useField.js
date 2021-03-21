import {
	useCallback,
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
			],
		)
	)

	return {
		errorMessages,
		fieldName,
		fieldVisited,
		isVisited: (
			isVisited
			.toString()
		),
		value,
		valueChanged,
	}
}

export default useField
