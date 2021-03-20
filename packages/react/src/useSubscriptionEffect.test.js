import {
	renderHook,
} from '@testing-library/react-hooks'

import useSubscriptionEffect from './useSubscriptionEffect.js'

describe(
	'useSubscriptionEffect',
	() => {
		test(
			'subscriber is not called when loaded',
			() => {
				const subscriber = (
					jest
					.fn()
				)

				renderHook(
					useSubscriptionEffect,
					{
						initialProps: {
							subscriber,
						},
					},
				)

				expect(
					subscriber
				)
				.toHaveBeenCalledTimes(0)
			},
		)

		test(
			'subscriber is called when value updates',
			() => {
				const subscriber = (
					jest
					.fn()
				)

				const {
					rerender,
				} = (
					renderHook(
						useSubscriptionEffect,
						{
							initialProps: {
								subscriber,
							},
						},
					)
				)

				const value = {}

				rerender({
					subscriber,
					value,
				})

				expect(
					subscriber
				)
				.toHaveBeenCalledTimes(1)

				expect(
					subscriber
				)
				.toHaveBeenCalledWith(
					value
				)
			},
		)

		test(
			'subscriber is called for each value update',
			() => {
				const subscriber = (
					jest
					.fn()
				)

				const {
					rerender,
				} = (
					renderHook(
						useSubscriptionEffect,
						{
							initialProps: {
								subscriber,
							},
						},
					)
				)

				const value1 = {}

				rerender({
					subscriber,
					value: value1,
				})

				const value2 = {}

				rerender({
					subscriber,
					value: value2,
				})

				expect(
					subscriber
				)
				.toHaveBeenCalledTimes(2)

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
					value2,
				)
			},
		)
	}
)
