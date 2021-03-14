import {
	act,
	renderHook,
} from '@testing-library/react-hooks'

import useValuesState from './useValuesState'

describe(
	'useValuesState',
	() => {
		test(
			'should publish values to field subscribers',
			() => {
				const {
					result,
				} = (
					renderHook(
						useValuesState
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
						.subscribeToFieldValue({
							fieldName: 'name',
							subscriber,
						})
					)
				})

				act(() => {
					unsubscribe2Ref
					.current = (
						result
						.current
						.subscribeToFieldValue({
							fieldName: 'name',
							subscriber,
						})
					)
				})

				const value = {}

				act(() => {
					result
					.current
					.setFieldValue(
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
			'should publish multiple values to field subscribers',
			() => {
				const {
					result,
				} = (
					renderHook(
						useValuesState
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
						.subscribeToFieldValue({
							fieldName: 'name',
							subscriber,
						})
					)
				})

				act(() => {
					unsubscribe2Ref
					.current = (
						result
						.current
						.subscribeToFieldValue({
							fieldName: 'name',
							subscriber,
						})
					)
				})

				const value1 = {}

				act(() => {
					result
					.current
					.setFieldValue(
						'name',
						value1,
					)
				})

				const value2 = {}

				act(() => {
					result
					.current
					.setFieldValue(
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
			'should set values on a single field',
			() => {
				const {
					result,
				} = (
					renderHook(
						useValuesState
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
						.subscribeToFieldValue({
							fieldName: 'name',
							subscriber,
						})
					)
				})

				const nameFieldValue = {}

				act(() => {
					result
					.current
					.setFieldValue(
						'name',
						nameFieldValue,
					)
				})

				const emailFieldValue = {}

				act(() => {
					result
					.current
					.setFieldValue(
						'email',
						emailFieldValue,
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
					nameFieldValue,
				)
			}
		)

		test(
			'should get the field value',
			() => {
				const {
					result,
				} = (
					renderHook(
						useValuesState
					)
				)

				const value = {}

				act(() => {
					result
					.current
					.setFieldValue(
						'name',
						value,
					)
				})

				const fieldValueRef = {
					current: null,
				}

				act(() => {
					fieldValueRef
					.current = (
						result
						.current
						.getFieldValue(
							'name',
						)
					)
				})

				expect(
					fieldValueRef
					.current
				)
				.toBe(
					value
				)
			}
		)

		test(
			'should get a default field value',
			() => {
				const {
					result,
				} = (
					renderHook(
						useValuesState
					)
				)

				const fieldValueRef = {
					current: null,
				}

				act(() => {
					fieldValueRef
					.current = (
						result
						.current
						.getFieldValue(
							'name',
						)
					)
				})

				expect(
					fieldValueRef
					.current
				)
				.toBe(
					''
				)
			}
		)
	}
)
