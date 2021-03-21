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
					.getAllRegistrations()
				)
				.toEqual(
					{}
				)
			}
		)
	}
)
