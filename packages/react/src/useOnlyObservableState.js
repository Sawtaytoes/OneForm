import {
	useCallback,
	useRef,
} from 'react'

import createObservable from './createObservable.js'

const initialObservables = {}

const useOnlyObservableState = () => {
	const observablesRef = (
		useRef(
			initialObservables
		)
	)

	const getObservable = (
		useCallback(
			(
				identifier,
			) => {
				if (
					!(
						observablesRef
						.current
						[identifier]
					)
				) {
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
				}

				return (
					observablesRef
					.current
					[identifier]
				)
			},
			[],
		)
	)

	const publishValue = (
		useCallback(
			(
				identifier,
				value,
			) => {
				getObservable(
					identifier
				)
				.publish(
					value
				)
			},
			[
				getObservable,
			],
		)
	)

	const publishUndefinedValues = (
		useCallback(
			() => {
				Object
				.entries(
					observablesRef
					.current
				)
				.forEach(([
					identifier,
				]) => {
					publishValue(
						identifier,
						undefined,
					)
				})
			},
			[
				publishValue,
			],
		)
	)

	const subscribeToValue = (
		useCallback(
			({
				identifier,
				subscriber,
			}) => (
				getObservable(
					identifier
				)
				.subscribe(
					subscriber
				)
			),
			[
				getObservable,
			],
		)
	)

	return {
		publishUndefinedValues,
		publishValue,
		subscribeToValue,
	}
}

export default useOnlyObservableState
