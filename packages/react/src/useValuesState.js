import {
	useCallback,
	useEffect,
	useRef,
} from 'react'

import useObservableState from './useObservableState.js'

const initialValues = {}
const initialLocalValues = {}

const useValuesState = (
	{
		onChange = (
			Function
			.prototype
		),
		updatedValues = (
			initialValues
		),
		values = (
			initialValues
		),
	} = {}
) => {
	const onChangeRef = (
		useRef()
	)

	onChangeRef
	.current = (
		onChange
	)

	const {
		publishValue,
		subscribeToValue,
	} = (
		useObservableState()
	)

	const localValuesRef = (
		useRef(
			initialLocalValues
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
				getAllLocalValues()
				[identifier]
			),
			[
				getAllLocalValues,
			],
		)
	)

	const setLocalValue = (
		useCallback(
			(
				identifier,
				value,
			) => {
				if (
					value
					=== (
						localValuesRef
						.current
						[identifier]
					)
				) {
					return
				}

				if (
					value
					=== undefined
				) {
					const copiedAllLocalValues = {
						...getAllLocalValues(),
					}

					Reflect
					.deleteProperty(
						copiedAllLocalValues,
						identifier,
					)

					localValuesRef
					.current = (
						copiedAllLocalValues
					)
				}
				else {
					localValuesRef
					.current = {
						...getAllLocalValues(),
						[identifier]: (
							value
						),
					}
				}

				onChangeRef
				.current({
					identifier,
					value,
					values: (
						getAllLocalValues()
					),
				})

				publishValue(
					identifier,
					value,
				)
			},
			[
				getAllLocalValues,
				publishValue,
			],
		)
	)

	useEffect(
		() => {
			Object
			.entries({
				...(
					Object
					.fromEntries(
						Object
						.entries(
							localValuesRef
							.current
						)
						.map(([
							identifier,
						]) => ([
							identifier,
						]))
					)
				),
				...values,
			})
			.forEach(([
				identifier,
				value,
			]) => {
				setLocalValue(
					identifier,
					value,
				)
			})
		},
		[
			setLocalValue,
			values,
		],
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
				setLocalValue(
					identifier,
					value,
				)
			})
		},
		[
			setLocalValue,
			updatedValues,
		],
	)

	return {
		getAllValues: getAllLocalValues,
		getValue: getLocalValue,
		setValue: setLocalValue,
		subscribeToValue: subscribeToValue,
	}
}

export default useValuesState
