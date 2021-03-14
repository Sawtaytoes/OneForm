import {
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react'

import FieldValueContext from './FieldValueContext.jsx'

const useFieldValue = ({
	name,
}) => {
	const {
		getFieldValue,
		setFieldValue,
		subscribeToFieldValue,
	} = (
		useContext(
			FieldValueContext
		)
	)

	const [
		localValue,
		setLocalValue,
	] = (
		useState(
			getFieldValue(
				name
			)
		)
	)

	const setValue = (
		useCallback(
			(
				value,
			) => {
				setFieldValue(
					name,
					value,
				)
			},
			[
				name,
				setFieldValue,
			],
		)
	)

	useEffect(
		() => (
			subscribeToFieldValue({
				identifier: name,
				subscriber: (
					value,
				) => (
					setLocalValue(
						value
					)
				),
			})
		),
		[
			name,
			subscribeToFieldValue,
		],
	)

	return {
		setValue,
		value: localValue,
	}
}

export default useFieldValue
