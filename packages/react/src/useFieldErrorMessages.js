import {
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react'

import ErrorMessagesContext from './ErrorMessagesContext.js'
import useFieldName from './useFieldName.js'

const useFieldErrorMessages = ({
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
		getFieldErrorMessages,
		setFieldErrorMessages,
		subscribeToFieldErrorMessages,
	} = (
		useContext(
			ErrorMessagesContext
		)
	)

	const [
		localErrorMessages,
		setLocalErrorMessages,
	] = (
		useState(
			getFieldErrorMessages(
				fieldName
			)
		)
	)

	const setErrorMessages = (
		useCallback(
			(
				value,
			) => {
				setFieldErrorMessages(
					fieldName,
					value,
				)
			},
			[
				fieldName,
				setFieldErrorMessages,
			],
		)
	)

	useEffect(
		() => (
			subscribeToFieldErrorMessages({
				identifier: (
					fieldName
				),
				subscriber: (
					setLocalErrorMessages
				),
			})
		),
		[
			fieldName,
			subscribeToFieldErrorMessages,
		],
	)

	return {
		errorMessages: localErrorMessages,
		setErrorMessages,
	}
}

export default useFieldErrorMessages
