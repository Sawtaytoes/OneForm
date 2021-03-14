import {
	act,
	renderHook,
} from '@testing-library/react-hooks'

import OneForm from './OneForm.jsx'
import useFieldErrorMessages from './useFieldErrorMessages.js'

describe(
	'useFieldErrorMessages',
	() => {
		test(
			'should have an `undefined` value',
			() => {
				const {
					result,
				} = (
					renderHook(
						useFieldErrorMessages,
						{
							initialProps: {
								name: 'email',
							},
							wrapper: OneForm,
						},
					)
				)

				expect(
					result
					.current
					.value
				)
				.toBeUndefined()
			}
		)

		test(
			'should set the value',
			() => {
				const {
					result,
				} = (
					renderHook(
						useFieldErrorMessages,
						{
							initialProps: {
								name: 'email',
							},
							wrapper: OneForm,
						},
					)
				)

				const errorMessages = [
					'This is an error!',
					'This is another error!',
				]

				act(() => {
					result
					.current
					.setErrorMessages(
						errorMessages
					)
				})

				expect(
					result
					.current
					.errorMessages
				)
				.toBe(
					errorMessages
				)
			}
		)

		test(
			'should get the latest set value',
			() => {
				const {
					result,
				} = (
					renderHook(
						useFieldErrorMessages,
						{
							initialProps: {
								name: 'email',
							},
							wrapper: OneForm,
						},
					)
				)

				act(() => {
					result
					.current
					.setErrorMessages([
						'You did something wrong.',
					])
				})

				const errorMessages = [
					'This is an error!',
					'This is another error!',
				]

				act(() => {
					result
					.current
					.setErrorMessages(
						errorMessages
					)
				})

				expect(
					result
					.current
					.errorMessages
				)
				.toBe(
					errorMessages
				)
			}
		)
	}
)
