import {
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react'

import ValuesStateContext from './ValuesStateContext.js'

const useFieldValue = ({
	name,
}) => {
	const {
		getFieldValue,
		setFieldValue,
		subscribeToFieldValue,
	} = (
		useContext(
			ValuesStateContext
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
