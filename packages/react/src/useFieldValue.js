import {
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react'

import ValuesContext from './ValuesContext.js'

const useFieldValue = ({
	name,
}) => {
	const {
		getFieldValue,
		setFieldValue,
		subscribeToFieldValue,
	} = (
		useContext(
			ValuesContext
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
				identifier: (
					name
				),
				subscriber: (
					setLocalValue
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
