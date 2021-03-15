import {
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react'

import ErrorMessagesContext from './ErrorMessagesContext.js'

const useFieldErrorMessages = ({
	name,
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
				name
			)
		)
	)

	const setErrorMessages = (
		useCallback(
			(
				value,
			) => {
				setFieldErrorMessages(
					name,
					value,
				)
			},
			[
				name,
				setFieldErrorMessages,
			],
		)
	)

	useEffect(
		() => (
			subscribeToFieldErrorMessages({
				identifier: name,
				subscriber: (
					value,
				) => (
					setLocalErrorMessages(
						value
					)
				),
			})
		),
		[
			name,
			subscribeToFieldErrorMessages,
		],
	)

	return {
		errorMessages: localErrorMessages,
		setErrorMessages,
	}
}

export default useFieldErrorMessages
