import {
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react'

import useFieldName from './useFieldName.js'
import ValuesContext from './ValuesContext.js'

const useFieldValue = ({
	name,
}) => {
	const {
		fieldName,
	} = (
		useFieldName({
			name,
		})
	)

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
