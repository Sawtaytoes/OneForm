import {
	useCallback,
	useEffect,
	useRef,
} from 'react'

import createObservable from './createObservable.js'

const initialObservables = {}
const initialValues = {}

const useObservableState = (
	{
		onChange = Function.prototype,
		updatedValues = initialValues,
		values = initialValues,
	} = {}
) => {
	const onChangeRef = (
		useRef()
	)

	onChangeRef
	.current = (
		onChange
	)

	const localValuesRef = (
		useRef(
			initialValues
		)
	)

	const getAllLocalValues = (
		useCallback(
			() => (
				localValuesRef
				.current
			),
			[],
		)
	)

	const getLocalValue = (
		useCallback(
			(
				identifier,
			) => (
				localValuesRef
				.current
				[identifier]
			),
			[],
		)
	)

	const setLocalValue = (
		useCallback(
			(
				identifier,
				value,
			) => {
				localValuesRef
				.current = {
					...(
						localValuesRef
						.current
					),
					[identifier]: (
						value
					),
				}
			},
			[],
		)
	)

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
				setLocalValue(
					identifier,
					value,
				)

				getObservable(
					identifier
				)
				.publish(
					value
				)
			},
			[
				getObservable,
				setLocalValue,
			],
		)
	)

	const publishUpdatedValues = (
		useCallback(
			(
				updatedValues = {},
			) => {
				Object
				.entries(
					updatedValues
				)
				.forEach(([
					identifier,
					value,
				]) => {
					publishValue(
						identifier,
						value,
					)
				})
			},
			[
				publishValue,
			],
		)
	)

	const changeValue = (
		useCallback(
			(
				identifier,
				value,
			) => {
				publishValue(
					identifier,
					value,
				)

				publishUpdatedValues(
					onChangeRef
					.current({
						identifier,
						value: (
							getLocalValue(
								identifier
							)
						),
						values: (
							getAllLocalValues()
						),
					})
				)
			},
			[
				getAllLocalValues,
				getLocalValue,
				publishUpdatedValues,
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
			.map(([
				identifier,
				value,
			]) => ({
				identifier,
				value: (
					(
						getObservable(
							identifier
						)
						=== value
					)
					? undefined
					: value
				),
			}))
			.forEach(({
				identifier,
				value,
			}) => {
				publishValue(
					identifier,
					value,
				)
			})
		},
		[
			getObservable,
			publishValue,
			values,
		],
	)

	useEffect(
		() => {
			publishUpdatedValues(
				updatedValues
			)
		},
		[
			publishUpdatedValues,
			updatedValues,
		],
	)

	return {
		getAllValues: getAllLocalValues,
		getValue: getLocalValue,
		setValue: changeValue,
		subscribeToValue,
	}
}

export default useObservableState
