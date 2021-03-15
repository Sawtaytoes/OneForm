import {
	act,
	renderHook,
} from '@testing-library/react-hooks'

import useObservableState from './useObservableState'

describe(
	'useObservableState',
	() => {
		test(
			'publish values to subscribers',
			() => {
				const {
					result,
				} = (
					renderHook(
						useObservableState,
						{
							initialProps: {
								updatedValuesState: {},
								valuesState: {},
							},
						},
					)
				)

				const subscriber = (
					jest
					.fn()
				)

				const unsubscribe1Ref = {
					current: null,
				}

				const unsubscribe2Ref = {
					current: null,
				}

				act(() => {
					unsubscribe1Ref
					.current = (
						result
						.current
						.subscribeToValue({
							identifier: 'name',
							subscriber,
						})
					)
				})

				act(() => {
					unsubscribe2Ref
					.current = (
						result
						.current
						.subscribeToValue({
							identifier: 'name',
							subscriber,
						})
					)
				})

				const value = 'John Smith'

				act(() => {
					result
					.current
					.setValue(
						'name',
						value,
					)
				})

				unsubscribe1Ref
				.current()

				unsubscribe2Ref
				.current()

				expect(
					subscriber
				)
				.toHaveBeenCalledTimes(
					2
				)

				expect(
					subscriber
				)
				.toHaveBeenNthCalledWith(
					1,
					value,
				)

				expect(
					subscriber
				)
				.toHaveBeenNthCalledWith(
					2,
					value,
				)
			}
		)

		test(
			'publish multiple values to subscribers',
			() => {
				const {
					result,
				} = (
					renderHook(
						useObservableState,
						{
							initialProps: {
								updatedValuesState: {},
								valuesState: {},
							},
						},
					)
				)

				const subscriber = (
					jest
					.fn()
				)

				const unsubscribe1Ref = {
					current: null,
				}

				const unsubscribe2Ref = {
					current: null,
				}

				act(() => {
					unsubscribe1Ref
					.current = (
						result
						.current
						.subscribeToValue({
							identifier: 'name',
							subscriber,
						})
					)
				})

				act(() => {
					unsubscribe2Ref
					.current = (
						result
						.current
						.subscribeToValue({
							identifier: 'name',
							subscriber,
						})
					)
				})

				const value1 = 'John Smith'

				act(() => {
					result
					.current
					.setValue(
						'name',
						value1,
					)
				})

				const value2 = 'Jane of the Jungle'

				act(() => {
					result
					.current
					.setValue(
						'name',
						value2,
					)
				})

				unsubscribe1Ref
				.current()

				unsubscribe2Ref
				.current()

				expect(
					subscriber
				)
				.toHaveBeenCalledTimes(
					4
				)

				expect(
					subscriber
				)
				.toHaveBeenNthCalledWith(
					1,
					value1,
				)

				expect(
					subscriber
				)
				.toHaveBeenNthCalledWith(
					2,
					value1,
				)

				expect(
					subscriber
				)
				.toHaveBeenNthCalledWith(
					3,
					value2,
				)

				expect(
					subscriber
				)
				.toHaveBeenNthCalledWith(
					4,
					value2,
				)
			}
		)

		test(
			'set values on a single identifier',
			() => {
				const {
					result,
				} = (
					renderHook(
						useObservableState,
						{
							initialProps: {
								updatedValuesState: {},
								valuesState: {},
							},
						},
					)
				)

				const subscriber = (
					jest
					.fn()
				)

				const unsubscribeRef = {
					current: null,
				}

				act(() => {
					unsubscribeRef
					.current = (
						result
						.current
						.subscribeToValue({
							identifier: 'name',
							subscriber,
						})
					)
				})

				const nameValue = 'John Smith'

				act(() => {
					result
					.current
					.setValue(
						'name',
						nameValue,
					)
				})

				const emailValue = 'john.smith@test.com'

				act(() => {
					result
					.current
					.setValue(
						'email',
						emailValue,
					)
				})

				unsubscribeRef
				.current()

				expect(
					subscriber
				)
				.toHaveBeenCalledTimes(
					1
				)

				expect(
					subscriber
				)
				.toHaveBeenNthCalledWith(
					1,
					nameValue,
				)
			}
		)

		test(
			'get the set value',
			() => {
				const {
					result,
				} = (
					renderHook(
						useObservableState,
						{
							initialProps: {
								updatedValuesState: {},
								valuesState: {},
							},
						},
					)
				)

				const value = 'John Smith'

				act(() => {
					result
					.current
					.setValue(
						'name',
						value,
					)
				})

				const valueRef = {
					current: null,
				}

				act(() => {
					valueRef
					.current = (
						result
						.current
						.getValue(
							'name',
						)
					)
				})

				expect(
					valueRef
					.current
				)
				.toBe(
					value
				)
			}
		)

		test(
			'have no value when none set',
			() => {
				const {
					result,
				} = (
					renderHook(
						useObservableState,
						{
							initialProps: {
								updatedValuesState: {},
								valuesState: {},
							},
						},
					)
				)

				const valueRef = {
					current: null,
				}

				act(() => {
					valueRef
					.current = (
						result
						.current
						.getValue(
							'name',
						)
					)
				})

				expect(
					valueRef
					.current
				)
				.toBeUndefined()
			}
		)

		test(
			'clearing values',
			() => {
				const values = {}

				const {
					rerender,
					result,
				} = (
					renderHook(
						useObservableState,
						{
							initialProps: {
								updatedValuesState: {},
								values,
							},
						},
					)
				)

				act(() => {
					result
					.current
					.setValue(
						'name',
						'John Smith',
					)
				})

				const emailValue = 'john.smith@test.com'

				act(() => {
					result
					.current
					.setValue(
						'email',
						emailValue,
					)
				})

				const nameValue = 'Jane of the Jungle'

				rerender({
					updatedValuesState: {
						name: nameValue,
					},
					values,
				})

				const nameValueRef = {
					current: null,
				}

				act(() => {
					nameValueRef
					.current = (
						result
						.current
						.getValue(
							'name',
						)
					)
				})

				const emailValueRef = {
					current: null,
				}

				act(() => {
					emailValueRef
					.current = (
						result
						.current
						.getValue(
							'email',
						)
					)
				})

				expect(
					nameValueRef
					.current
				)
				.toBe(
					nameValue
				)

				expect(
					emailValueRef
					.current
				)
				.toBe(
					emailValue
				)
			}
		)

		test(
			'initializes with merged values',
			() => {
				const emailValue = 'john.smith@test.com'
				const nameValue = 'John Smith'

				const {
					result,
				} = (
					renderHook(
						useObservableState,
						{
							initialProps: {
								updatedValuesState: {
									email: emailValue,
									name: nameValue,
								},
								valuesState: {},
							},
						},
					)
				)

				const nameValueRef = {
					current: null,
				}

				act(() => {
					nameValueRef
					.current = (
						result
						.current
						.getValue(
							'name',
						)
					)
				})

				const emailValueRef = {
					current: null,
				}

				act(() => {
					emailValueRef
					.current = (
						result
						.current
						.getValue(
							'email',
						)
					)
				})

				expect(
					emailValueRef
					.current
				)
				.toBe(
					emailValue
				)

				expect(
					nameValueRef
					.current
				)
				.toBe(
					nameValue
				)
			}
		)

		test(
			'merges values',
			() => {
				const updatedValuesState = {}

				const {
					rerender,
					result,
				} = (
					renderHook(
						useObservableState,
						{
							initialProps: {
								updatedValuesState,
								valuesState: {},
							},
						},
					)
				)

				act(() => {
					result
					.current
					.setValue(
						'name',
						'John Smith',
					)
				})

				const emailValue = 'john.smith@test.com'

				act(() => {
					result
					.current
					.setValue(
						'email',
						emailValue,
					)
				})

				const nameValue = 'Jane of the Jungle'

				rerender({
					updatedValuesState,
					valuesState: {
						name: nameValue,
					},
				})

				const nameValueRef = {
					current: null,
				}

				act(() => {
					nameValueRef
					.current = (
						result
						.current
						.getValue(
							'name',
						)
					)
				})

				const emailValueRef = {
					current: null,
				}

				act(() => {
					emailValueRef
					.current = (
						result
						.current
						.getValue(
							'email',
						)
					)
				})

				expect(
					nameValueRef
					.current
				)
				.toBe(
					nameValue
				)

				expect(
					emailValueRef
					.current
				)
				.toBeUndefined()
			}
		)
	}
)
