import {
	useCallback,
} from 'react'

import useFieldData from './useFieldData.js'

const useField = ({
	name,
	onChange,
}) => {
	const {
		errorMessages = [],
		setValue,
		setVisited,
		value = '',
	} = (
		useFieldData({
			name,
		})
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
		value,
		valueChanged,
	}
}

export default useField
