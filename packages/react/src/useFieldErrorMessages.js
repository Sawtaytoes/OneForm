import {
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react'

import ErrorMessagesContext from './ErrorMessagesContext.js'
import useFieldName from './useFieldName.js'

const useFieldErrorMessages = ({
	name,
}) => {
	const fieldErrorMessagesSymbol = (
		useMemo(
			() => (
				Symbol()
			),
			[]
		)
	)

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
				errorMessages,
			) => {
				setFieldErrorMessages(
					fieldName,
					{
						errorMessages,
						symbol: (
							fieldErrorMessagesSymbol
						),
					},
				)
			},
			[
				fieldErrorMessagesSymbol,
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
