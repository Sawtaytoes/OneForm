import {
	act,
	renderHook,
} from '@testing-library/react-hooks'

import useVisitationState from './useVisitationState.js'

describe(
	'useVisitationState',
	() => {
		test(
			'values are initially not visited',
			() => {
				const {
					result,
				} = (
					renderHook(
						useVisitationState,
					)
				)

				expect(
					result
					.current
					.getIsVisited(
						'email'
					)
				)
				.toBeFalsy()
			},
		)

		test(
			'values are visisted after visiting',
			() => {
				const {
					result,
				} = (
					renderHook(
						useVisitationState,
					)
				)

				act(() => {
					result
					.current
					.setVisited(
						'email'
					)
				})

				expect(
					result
					.current
					.getIsVisited(
						'email'
					)
				)
				.toBe(
					true
				)
			},
		)

		test(
			'visiting multiple values only visits those values',
			() => {
				const {
					result,
				} = (
					renderHook(
						useVisitationState,
					)
				)

				act(() => {
					result
					.current
					.setVisited(
						'email'
					)
				})

				act(() => {
					result
					.current
					.setVisited(
						'name'
					)
				})

				expect(
					result
					.current
					.getIsVisited(
						'email'
					)
				)
				.toBe(
					true
				)

				expect(
					result
					.current
					.getIsVisited(
						'name'
					)
				)
				.toBe(
					true
				)

				expect(
					result
					.current
					.getIsVisited(
						'nickname'
					)
				)
				.toBeFalsy()
			},
		)

		test(
			'resetting visitations marks all values as not visited',
			() => {
				const {
					result,
				} = (
					renderHook(
						useVisitationState,
					)
				)

				act(() => {
					result
					.current
					.setVisited(
						'email'
					)
				})

				act(() => {
					result
					.current
					.setVisited(
						'name'
					)
				})

				act(() => {
					result
					.current
					.resetAllVisitations()
				})

				expect(
					result
					.current
					.getIsVisited(
						'email'
					)
				)
				.toBeFalsy()

				expect(
					result
					.current
					.getIsVisited(
						'name'
					)
				)
				.toBeFalsy()
			},
		)

		test(
			'notifies when visited and not visited',
			() => {
				const {
					result,
				} = (
					renderHook(
						useVisitationState,
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
						.subscribeToIsVisited({
							identifier: 'email',
							subscriber,
						})
					)
				})

				act(() => {
					result
					.current
					.setVisited(
						'email'
					)
				})

				act(() => {
					result
					.current
					.resetAllVisitations()
				})

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
					true,
				)

				expect(
					subscriber
				)
				.toHaveBeenNthCalledWith(
					2,
					undefined,
				)
			},
		)
	}
)
