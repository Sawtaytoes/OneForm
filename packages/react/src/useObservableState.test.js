import {
	act,
	renderHook,
} from '@testing-library/react-hooks'

import useObservableState from './useObservableState.js'

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
			'notifies when publications occur',
			() => {
				const publishCallback = (
					jest
					.fn()
				)

				const {
					result,
				} = (
					renderHook(
						useObservableState,
						{
							initialProps: {
								onPublish: (
									publishCallback
								),
							},
						}
					)
				)

				const identifier = 'email'
				const value1 = 'jane.of.the.jungle@test.com'

				act(() => {
					result
					.current
					.setValue(
						identifier,
						value1,
					)
				})

				const value2 = 'john.smith@test.com'

				act(() => {
					result
					.current
					.setValue(
						identifier,
						value2,
					)
				})

				expect(
					publishCallback
				)
				.toHaveBeenCalledTimes(
					2
				)

				expect(
					publishCallback
				)
				.toHaveBeenNthCalledWith(
					1,
					{
						identifier,
						value: value1,
						values: {
							[identifier]: (
								value1
							),
						},
					},
				)

				expect(
					publishCallback
				)
				.toHaveBeenNthCalledWith(
					2,
					{
						identifier,
						value: value2,
						values: {
							[identifier]: (
								value2
							),
						},
					},
				)
			}
		)

		test(
			'notifies newest callback when a publication occurs',
			() => {
				const publishCallback1 = (
					jest
					.fn()
				)

				const {
					rerender,
					result,
				} = (
					renderHook(
						useObservableState,
						{
							initialProps: {
								onPublish: (
									publishCallback1
								),
							},
						}
					)
				)

				const identifier = 'email'
				const value1 = 'jane.of.the.jungle@test.com'

				act(() => {
					result
					.current
					.setValue(
						identifier,
						value1,
					)
				})

				const publishCallback2 = (
					jest
					.fn()
				)

				rerender({
					onPublish: (
						publishCallback2
					),
				})

				const value2 = 'john.smith@test.com'

				act(() => {
					result
					.current
					.setValue(
						identifier,
						value2,
					)
				})

				expect(
					publishCallback1
				)
				.toHaveBeenCalledTimes(
					1
				)

				expect(
					publishCallback1
				)
				.toHaveBeenCalledWith({
					identifier,
					value: value1,
					values: {
						[identifier]: (
							value1
						),
					},
				})

				expect(
					publishCallback2
				)
				.toHaveBeenCalledTimes(
					1
				)

				expect(
					publishCallback2
				)
				.toHaveBeenCalledWith({
					identifier,
					value: value2,
					values: {
						[identifier]: (
							value2
						),
					},
				})
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
			'notifies when changes occur',
			() => {
				const changeCallback = (
					jest
					.fn()
				)

				const {
					result,
				} = (
					renderHook(
						useObservableState,
						{
							initialProps: {
								onChange: (
									changeCallback
								),
							},
						}
					)
				)

				const identifier = 'email'
				const value1 = 'jane.of.the.jungle@test.com'

				act(() => {
					result
					.current
					.setValue(
						identifier,
						value1,
					)
				})

				const value2 = 'john.smith@test.com'

				act(() => {
					result
					.current
					.setValue(
						identifier,
						value2,
					)
				})

				expect(
					changeCallback
				)
				.toHaveBeenCalledTimes(
					2
				)

				expect(
					changeCallback
				)
				.toHaveBeenNthCalledWith(
					1,
					{
						identifier,
						value: value1,
						values: {
							[identifier]: (
								value1
							),
						},
					},
				)

				expect(
					changeCallback
				)
				.toHaveBeenNthCalledWith(
					2,
					{
						identifier,
						value: value2,
						values: {
							[identifier]: (
								value2
							),
						},
					},
				)
			}
		)

		test(
			'notifies newest callback when a change occurs',
			() => {
				const changeCallback1 = (
					jest
					.fn()
				)

				const {
					rerender,
					result,
				} = (
					renderHook(
						useObservableState,
						{
							initialProps: {
								onChange: (
									changeCallback1
								),
							},
						}
					)
				)

				const identifier = 'email'
				const value1 = 'jane.of.the.jungle@test.com'

				act(() => {
					result
					.current
					.setValue(
						identifier,
						value1,
					)
				})

				const changeCallback2 = (
					jest
					.fn()
				)

				rerender({
					onChange: (
						changeCallback2
					),
				})

				const value2 = 'john.smith@test.com'

				act(() => {
					result
					.current
					.setValue(
						identifier,
						value2,
					)
				})

				expect(
					changeCallback1
				)
				.toHaveBeenCalledTimes(
					1
				)

				expect(
					changeCallback1
				)
				.toHaveBeenCalledWith({
					identifier,
					value: value1,
					values: {
						[identifier]: (
							value1
						),
					},
				})

				expect(
					changeCallback2
				)
				.toHaveBeenCalledTimes(
					1
				)

				expect(
					changeCallback2
				)
				.toHaveBeenCalledWith({
					identifier,
					value: value2,
					values: {
						[identifier]: (
							value2
						),
					},
				})
			}
		)

		test(
			'notifies when a returned changes occur',
			() => {
				const nameIdentifier = 'name'
				const nameValue = 'John Smith'

				const changeCallback = () => ({
					[nameIdentifier]: (
						nameValue
					),
				})

				const publishCallback = (
					jest
					.fn()
				)

				const {
					result,
				} = (
					renderHook(
						useObservableState,
						{
							initialProps: {
								onChange: (
									changeCallback
								),
								onPublish: (
									publishCallback
								),
							},
						}
					)
				)

				const emailIdentifier = 'email'
				const emailValue = 'john.smith@test.com'

				act(() => {
					result
					.current
					.setValue(
						emailIdentifier,
						emailValue,
					)
				})

				expect(
					publishCallback
				)
				.toHaveBeenCalledTimes(
					2
				)

				expect(
					publishCallback
				)
				.toHaveBeenCalledWith({
					identifier: emailIdentifier,
					value: emailValue,
					values: {
						[emailIdentifier]: (
							emailValue
						),
					},
				})

				expect(
					publishCallback
				)
				.toHaveBeenCalledWith({
					identifier: nameIdentifier,
					value: nameValue,
					values: {
						[emailIdentifier]: (
							emailValue
						),
						[nameIdentifier]: (
							nameValue
						),
					},
				})
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
								updatedValues: {
									email: (
										emailValue
									),
									name: (
										nameValue
									),
								},
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
			'merges values when values updates',
			() => {
				const {
					rerender,
					result,
				} = (
					renderHook(
						useObservableState,
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
					updatedValues: {
						name: nameValue,
					},
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
			'initializes with overwritten values',
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
								values: {
									email: (
										emailValue
									),
									name: (
										nameValue
									),
								},
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
			'overwrites all values when given new values',
			() => {
				const {
					rerender,
					result,
				} = (
					renderHook(
						useObservableState,
					)
				)

				act(() => {
					result
					.current
					.setValue(
						'name',
						'Jane of the Jungle',
					)
				})

				act(() => {
					result
					.current
					.setValue(
						'email',
						'john.smith@test.com',
					)
				})

				const nameValue = 'John Smith'

				rerender({
					values: {
						name: nameValue,
					},
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

				expect(
					emailValueRef
					.current
				)
				.toBeUndefined()

				expect(
					nameValueRef
					.current
				)
				.toBe(
					nameValue
				)
			}
		)
	}
)
