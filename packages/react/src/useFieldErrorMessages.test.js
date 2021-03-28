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
			'has `undefined` error messages',
			() => {
				const {
					result,
				} = (
					renderHook(
						useFieldErrorMessages,
						{
							initialProps: {
								fieldName: 'email',
							},
							wrapper: OneForm,
						},
					)
				)

				expect(
					result
					.current
					.errorMessages
				)
				.toBeUndefined()
			}
		)

		test(
			'sets the error messages',
			() => {
				const {
					result,
				} = (
					renderHook(
						useFieldErrorMessages,
						{
							initialProps: {
								fieldName: 'email',
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
				.toEqual(
					errorMessages
				)
			}
		)

		test(
			'gets the latest set error messages',
			() => {
				const {
					result,
				} = (
					renderHook(
						useFieldErrorMessages,
						{
							initialProps: {
								fieldName: 'email',
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
				.toEqual(
					errorMessages
				)
			}
		)
	}
)
