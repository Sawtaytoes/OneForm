import {
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react'

import ErrorMessagesContext from './ErrorMessagesContext.js'

const useFieldErrorMessages = ({
	fieldName,
}) => {
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
