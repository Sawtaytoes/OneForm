import {
	act,
	renderHook,
} from '@testing-library/react-hooks'

import useRegistrationState from './useRegistrationState.js'

describe(
	'useRegistrationState',
	() => {
		test(
			'registers',
			() => {
				const {
					result,
				} = (
					renderHook(
						useRegistrationState,
					)
				)

				act(() => {
					result
					.current
					.register(
						'email'
					)
				})

				expect(
					result
					.current
					.getIsRegistered(
						'email'
					)
				)
				.toBe(
					true
				)

				expect(
					result
					.current
					.getAllRegistrations()
				)
				.toEqual({
					email: 1,
				})
			}
		)

		test(
			'unregisters',
			() => {
				const {
					result,
				} = (
					renderHook(
						useRegistrationState,
					)
				)

				const unregisterRef = {
					current: null,
				}

				act(() => {
					unregisterRef
					.current = (
						result
						.current
						.register(
							'email'
						)
					)
				})

				unregisterRef
				.current()

				expect(
					result
					.current
					.getIsRegistered(
						'email'
					)
				)
				.toBe(
					false
				)

				expect(
					result
					.current
					.getAllRegistrations()
				)
				.toEqual(
					{}
				)
			}
		)

		test(
			'allows multiple registrations of the same identifier',
			() => {
				const {
					result,
				} = (
					renderHook(
						useRegistrationState,
					)
				)

				const unregister1Ref = {
					current: null,
				}

				act(() => {
					unregister1Ref
					.current = (
						result
						.current
						.register(
							'email'
						)
					)
				})

				const unregister2Ref = {
					current: null,
				}

				act(() => {
					unregister2Ref
					.current = (
						result
						.current
						.register(
							'email'
						)
					)
				})

				expect(
					result
					.current
					.getIsRegistered(
						'email'
					)
				)
				.toBe(
					true
				)

				expect(
					result
					.current
					.getAllRegistrations()
				)
				.toEqual({
					email: 2,
				})

				unregister1Ref
				.current()

				unregister2Ref
				.current()

				expect(
					result
					.current
					.getIsRegistered(
						'email'
					)
				)
				.toBe(
					false
				)

				expect(
					result
					.current
					.getAllRegistrations()
				)
				.toEqual(
					{}
				)
			}
		)

		test(
			'allows registering different identifiers',
			() => {
				const {
					result,
				} = (
					renderHook(
						useRegistrationState,
					)
				)

				const unregister1Ref = {
					current: null,
				}

				act(() => {
					unregister1Ref
					.current = (
						result
						.current
						.register(
							'email'
						)
					)
				})

				const unregister2Ref = {
					current: null,
				}

				act(() => {
					unregister2Ref
					.current = (
						result
						.current
						.register(
							'name'
						)
					)
				})

				expect(
					result
					.current
					.getIsRegistered(
						'email'
					)
				)
				.toBe(
					true
				)

				expect(
					result
					.current
					.getIsRegistered(
						'name'
					)
				)
				.toBe(
					true
				)

				expect(
					result
					.current
					.getAllRegistrations()
				)
				.toEqual({
					email: 1,
					name: 1,
				})

				unregister1Ref
				.current()

				unregister2Ref
				.current()

				expect(
					result
					.current
					.getIsRegistered(
						'email'
					)
				)
				.toBe(
					false
				)

				expect(
					result
					.current
					.getIsRegistered(
						'name'
					)
				)
				.toBe(
					false
				)

				expect(
					result
					.current
					.getAllRegistrations()
				)
				.toEqual(
					{}
				)
			}
		)

		test(
			'notifies when registrations occur',
			() => {
				const onRegister = (
					jest
					.fn()
				)

				const {
					result,
				} = (
					renderHook(
						useRegistrationState,
						{
							initialProps: {
								onRegister,
							},
						},
					)
				)

				act(() => {
					result
					.current
					.register(
						'email'
					)
				})

				expect(
					onRegister
				)
				.toHaveBeenCalledTimes(
					1
				)

				expect(
					onRegister
				)
				.toHaveBeenCalledWith(
					'email',
				)
			}
		)

		test(
			'notifies when registrations are unregistered',
			() => {
				const onUnregister = (
					jest
					.fn()
				)

				const {
					result,
				} = (
					renderHook(
						useRegistrationState,
						{
							initialProps: {
								onUnregister,
							},
						},
					)
				)

				const unregisterRef = {
					current: null,
				}

				act(() => {
					unregisterRef
					.current = (
						result
						.current
						.register(
							'email'
						)
					)
				})

				unregisterRef
				.current()

				expect(
					onUnregister
				)
				.toHaveBeenCalledTimes(
					1
				)

				expect(
					onUnregister
				)
				.toHaveBeenCalledWith(
					'email',
				)
			}
		)
	}
)
