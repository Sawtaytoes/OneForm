import {
	useCallback,
	useContext,
	useMemo,
} from 'react'

import FieldGroupContext from './FieldGroupContext'
import useFieldData from './useFieldData.js'

const useField = ({
	name,
	onChange,
	onVisit,
}) => {
	const {
		fieldGroups,
	} = (
		useContext(
			FieldGroupContext
		)
	)

	const fieldName = (
		useMemo(
			() => (
				[
					name,
				]
				.concat(
					fieldGroups
					.map(({
						name,
						value,
					}) => (
						`/${name}:${value}`
					))
				)
				.join('/')
			),
			[
				fieldGroups,
				name,
			],
		)
	)

	const {
		errorMessages = [],
		isVisited = false,
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
