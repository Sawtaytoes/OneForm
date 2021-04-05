import {
	act,
	renderHook,
} from '@testing-library/react-hooks'

import useErrorMessagesState from './useErrorMessagesState.js'

describe(
	'useErrorMessagesState',
	() => {
		test(
			'have no value when none set',
			() => {
				const {
					result,
				} = (
					renderHook(
						useErrorMessagesState,
					)
				)

				expect(
					result
					.current
					.getErrorMessages(
						'name',
					)
				)
				.toEqual(
					[]
				)
			}
		)

		test(
			'sets error messages',
			() => {
				const error = {
					errorMessages: [
						'You must enter a value.',
						'You forgot an `@` sign.',
					],
					symbol: Symbol(),
				}

				const identifier = 'email'

				const {
					result,
				} = (
					renderHook(
						useErrorMessagesState,
					)
				)

				act(() => {
					result
					.current
					.setErrorMessages(
						identifier,
						error,
					)
				})

				expect(
					result
					.current
					.getErrorMessages(
						identifier
					)
				)
				.toEqual(
					error
					.errorMessages
				)

				expect(
					result
					.current
					.getAllErrorMessages()
				)
				.toEqual(
					error
					.errorMessages
				)
			}
		)

		test(
			'replaces error messages based on a symbol',
			() => {
				const symbol1 = Symbol()
				const symbol2 = Symbol()

				const identifier = 'email'

				const {
					result,
				} = (
					renderHook(
						useErrorMessagesState,
					)
				)

				act(() => {
					result
					.current
					.setErrorMessages(
						identifier,
						{
							errorMessages: [
								'You must enter a value.',
								'You forgot an `@` sign.',
							],
							symbol: symbol1,
						},
					)
				})

				act(() => {
					result
					.current
					.setErrorMessages(
						identifier,
						{
							errorMessages: [
								'Your email is invalid.',
							],
							symbol: symbol2,
						},
					)
				})

				act(() => {
					result
					.current
					.setErrorMessages(
						identifier,
						{
							errorMessages: [
								'You must enter a value.',
							],
							symbol: symbol1,
						},
					)
				})

				expect(
					result
					.current
					.getErrorMessages(
						identifier
					)
				)
				.toEqual([
					'You must enter a value.',
					'Your email is invalid.',
				])

				expect(
					result
					.current
					.getAllErrorMessages()
				)
				.toEqual([
					'You must enter a value.',
					'Your email is invalid.',
				])
			}
		)

		test(
			'publish error messages to subscribers',
			() => {
				const {
					result,
				} = (
					renderHook(
						useErrorMessagesState,
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
						.subscribeToErrorMessages({
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
						.subscribeToErrorMessages({
							identifier: 'name',
							subscriber,
						})
					)
				})

				const errorMessages = [
					'You need to enter a name.',
				]

				act(() => {
					result
					.current
					.setErrorMessages(
						'name',
						{
							errorMessages,
							symbol: Symbol(),
						},
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
					errorMessages,
				)

				expect(
					subscriber
				)
				.toHaveBeenNthCalledWith(
					2,
					errorMessages,
				)
			}
		)

		test(
			'notifies when error messages occur',
			() => {
				const errorMessagesCallback = (
					jest
					.fn()
				)

				const {
					result,
				} = (
					renderHook(
						useErrorMessagesState,
						{
							initialProps: {
								onErrorMessages: (
									errorMessagesCallback
								),
							},
						}
					)
				)

				const identifier = 'email'

				const errorMessages1 = [
					'You need to enter a name.',
				]

				const error1 = {
					errorMessages: errorMessages1,
					symbol: Symbol(),
				}

				act(() => {
					result
					.current
					.setErrorMessages(
						identifier,
						error1,
					)
				})

				const errorMessages2 = [
					'Your name is too long.',
				]

				act(() => {
					result
					.current
					.setErrorMessages(
						identifier,
						{
							errorMessages: errorMessages2,
							symbol: Symbol(),
						},
					)
				})

				act(() => {
					result
					.current
					.setErrorMessages(
						identifier,
						error1,
					)
				})

				expect(
					errorMessagesCallback
				)
				.toHaveBeenCalledTimes(
					3
				)

				expect(
					errorMessagesCallback
				)
				.toHaveBeenNthCalledWith(
					1,
					{
						errorMessages: errorMessages1,
						identifier,
					},
				)

				expect(
					errorMessagesCallback
				)
				.toHaveBeenNthCalledWith(
					2,
					{
						errorMessages: [
							...errorMessages1,
							...errorMessages2,
						],
						identifier,
					},
				)

				expect(
					errorMessagesCallback
				)
				.toHaveBeenNthCalledWith(
					3,
					{
						errorMessages: [
							...errorMessages1,
							...errorMessages2,
						],
						identifier,
					},
				)
			}
		)

		test(
			'initializes with merged error messages',
			() => {
				const emailErrorMessages = [
					'You must enter an email.',
					'You forgot the `@` sign.',
				]

				const nameErrorMessages = [
					'You must enter a name.',
				]

				const {
					result,
				} = (
					renderHook(
						useErrorMessagesState,
						{
							initialProps: {
								updatedErrorMessages: {
									email: emailErrorMessages,
									name: nameErrorMessages,
								},
							},
						},
					)
				)

				expect(
					result
					.current
					.getErrorMessages(
						'email',
					)
				)
				.toEqual(
					emailErrorMessages
				)

				expect(
					result
					.current
					.getErrorMessages(
						'name',
					)
				)
				.toEqual(
					nameErrorMessages
				)
			}
		)

		test(
			'merges error messages when given updated error messages',
			() => {
				const {
					rerender,
					result,
				} = (
					renderHook(
						useErrorMessagesState,
					)
				)

				const nameErrorMessages1 = [
					'You must enter a name.',
				]

				act(() => {
					result
					.current
					.setErrorMessages(
						'name',
						{
							errorMessages: nameErrorMessages1,
							symbol: Symbol(),
						},
					)
				})

				const emailErrorMessages = [
					'You must enter an email.',
					'You forgot the `@` sign.',
				]

				act(() => {
					result
					.current
					.setErrorMessages(
						'email',
						{
							errorMessages: emailErrorMessages,
							symbol: Symbol(),
						},
					)
				})

				const nameErrorMessages2 = [
					'Your name is too long.',
				]

				rerender({
					updatedErrorMessages: {
						name: nameErrorMessages2,
					},
				})

				expect(
					result
					.current
					.getErrorMessages(
						'email',
					)
				)
				.toEqual(
					emailErrorMessages
				)

				expect(
					result
					.current
					.getErrorMessages(
						'name',
					)
				)
				.toEqual([
					...nameErrorMessages1,
					...nameErrorMessages2,
				])
			}
		)

		test(
			'initializes with overwritten error messages',
			() => {
				const emailErrorMessages = [
					'You must enter an email.',
					'You forgot the `@` sign.',
				]

				const nameErrorMessages = [
					'You must enter a name.',
				]

				const {
					result,
				} = (
					renderHook(
						useErrorMessagesState,
						{
							initialProps: {
								errorMessages: {
									email: emailErrorMessages,
									name: nameErrorMessages,
								},
							},
						},
					)
				)

				expect(
					result
					.current
					.getErrorMessages(
						'email',
					)
				)
				.toEqual(
					emailErrorMessages
				)

				expect(
					result
					.current
					.getErrorMessages(
						'name',
					)
				)
				.toEqual(
					nameErrorMessages
				)
			}
		)

		test(
			'overwrites all external error messages when given new external error messages',
			() => {
				const {
					rerender,
					result,
				} = (
					renderHook(
						useErrorMessagesState,
						{
							initialProps: {
								email: 'Email is required.',
								name: 'Name is required.',
							},
						},
					)
				)

				const nameErrorMessages1 = (
					'Your name is too long.'
				)

				act(() => {
					result
					.current
					.setErrorMessages(
						'name',
						{
							errorMessages: (
								nameErrorMessages1
							),
							symbol: Symbol(),
						},
					)
				})

				const emailErrorMessages = [
					'You must enter an email.',
					'You forgot the `@` sign.',
				]

				act(() => {
					result
					.current
					.setErrorMessages(
						'email',
						{
							errorMessages: (
								emailErrorMessages
							),
							symbol: Symbol(),
						},
					)
				})

				const nameErrorMessages2 = (
					'Your name is too long.'
				)

				rerender({
					errorMessages: {
						name: (
							nameErrorMessages2
						),
					},
				})

				expect(
					result
					.current
					.getErrorMessages(
						'email',
					)
				)
				.toEqual(
					emailErrorMessages
				)

				expect(
					result
					.current
					.getErrorMessages(
						'name',
					)
				)
				.toEqual([
					nameErrorMessages1,
					nameErrorMessages2,
				])
			}
		)
	}
)
