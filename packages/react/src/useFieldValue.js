import {
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react'

import ValuesContext from './ValuesContext.js'

const useFieldValue = ({
	fieldName,
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
				fieldName
			)
		)
	)

	const setValue = (
		useCallback(
			(
				value,
			) => {
				setFieldValue(
					fieldName,
					value,
				)
			},
			[
				fieldName,
				setFieldValue,
			],
		)
	)

	useEffect(
		() => (
			subscribeToFieldValue({
				identifier: (
					fieldName
				),
				subscriber: (
					setLocalValue
				),
			})
		),
		[
			fieldName,
			subscribeToFieldValue,
		],
	)

	return {
		setValue,
		value: localValue,
	}
}

export default useFieldValue
