import {
	useCallback,
	useEffect,
	useRef,
} from 'react'

import createObservable from './createObservable'

const initialValueObservables = {}

const useObservableState = ({
	updatedValues,
	values,
}) => {
	const observablesRef = (
		useRef(
			initialValueObservables
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
			.entries(
				updatedValues
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
			updatedValues,
		],
	)

	useEffect(
		() => {
			Object
			.entries({
				...(
					observablesRef
					.current
				),
				...values,
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
			values,
		],
	)

	return {
		getValue,
		setValue,
		subscribeToValue,
	}
}

export default useObservableState
