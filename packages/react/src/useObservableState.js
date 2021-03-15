import {
	useCallback,
	useEffect,
	useRef,
} from 'react'

import createObservable from './createObservable.js'

const initialObservables = {}

const useObservableState = ({
	updatedValuesState,
	valuesState,
}) => {
	const observablesRef = (
		useRef(
			initialObservables
		)
	)

	const createValueObservable = (
		useCallback(
			(
				identifier,
			) => {
				observablesRef
				.current = {
					...(
						observablesRef
						.current
					),
					[identifier]: (
						createObservable()
					),
				}
			},
			[],
		)
	)

	const getValue = (
		useCallback(
			(
				identifier,
			) => (
				observablesRef
				.current
				[identifier]
				?.getValue()
			),
			[],
		)
	)

	const setValue = (
		useCallback(
			(
				identifier,
				value,
			) => {
				if (
					!(
						observablesRef
						.current
						[identifier]
					)
				) {
					createValueObservable(
						identifier
					)
				}

				observablesRef
				.current
				[identifier]
				.publish(
					value
				)
			},
			[
				createValueObservable,
			],
		)
	)

	const subscribeToValue = (
		useCallback(
			({
				identifier,
				subscriber,
			}) => {
				if (
					!(
						observablesRef
						.current
						[identifier]
					)
				) {
					createValueObservable(
						identifier
					)
				}

				return (
					observablesRef
					.current
					[identifier]
					.subscribe(
						subscriber
					)
				)
			},
			[
				createValueObservable,
			],
		)
	)

	useEffect(
		() => {
			Object
			.entries({
				...(
					observablesRef
					.current
				),
				...valuesState,
			})
			.forEach(([
				identifier,
				value,
			]) => {
				if (
					value
					?.publish
				) {
					value
					.publish()
				}
				else {
					setValue(
						identifier,
						value,
					)
				}
			})
		},
		[
			setValue,
			valuesState,
		],
	)

	useEffect(
		() => {
			Object
			.entries(
				updatedValuesState
			)
			.forEach(([
				identifier,
				value,
			]) => {
				setValue(
					identifier,
					value,
				)
			})
		},
		[
			setValue,
			updatedValuesState,
		],
	)

	return {
		getValue,
		setValue,
		subscribeToValue,
	}
}

export default useObservableState
