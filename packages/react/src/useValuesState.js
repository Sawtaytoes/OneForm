import {
	useCallback,
	useRef,
} from 'react'

import createObservable from './createObservable'

const initialValueObservables = {}

const useValuesState = () => {
	const observablesRef = (
		useRef(
			initialValueObservables
		)
	)

	const createFieldValueObservable = (
		useCallback(
			(
				fieldName,
			) => {
				observablesRef
				.current = {
					...(
						observablesRef
						.current
					),
					[fieldName]: (
						createObservable()
					),
				}
			},
			[],
		)
	)

	const getFieldValue = (
		useCallback(
			(
				fieldName,
			) => (
				(
					observablesRef
					.current
					[fieldName]
					?.getValue()
				)
				|| ''
			),
			[],
		)
	)

	const setFieldValue = (
		useCallback(
			(
				fieldName,
				value,
			) => {
				if (
					!(
						observablesRef
						.current
						[fieldName]
					)
				) {
					createFieldValueObservable(
						fieldName
					)
				}

				observablesRef
				.current
				[fieldName]
				.publish(
					value
				)
			},
			[
				createFieldValueObservable,
			],
		)
	)

	const subscribeToFieldValue = (
		useCallback(
			({
				fieldName,
				subscriber,
			}) => {
				if (
					!(
						observablesRef
						.current
						[fieldName]
					)
				) {
					createFieldValueObservable(
						fieldName
					)
				}

				return (
					observablesRef
					.current
					[fieldName]
					.subscribe(
						subscriber
					)
				)
			},
			[
				createFieldValueObservable,
			],
		)
	)

	return {
		getFieldValue,
		setFieldValue,
		subscribeToFieldValue,
	}
}

export default useValuesState
