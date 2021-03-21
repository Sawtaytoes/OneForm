import {
	act,
	renderHook,
} from '@testing-library/react-hooks'

import useValidationType, {
	validationTypes,
} from './useValidationType.js'

describe(
	'useValidationType',
	() => {
		test(
			'starts as `submit` type by default',
			() => {
				const {
					result,
				} = (
					renderHook(
						useValidationType,
					)
				)

				expect(
					result
					.current
					.getValidationType()
				)
				.toBe(
					validationTypes
					.submit
				)
			}
		)

		test(
			'starts as `change` type when enabled',
			() => {
				const {
					result,
				} = (
					renderHook(
						useValidationType,
						{
							initialProps: {
								hasChangeValidation: (
									true
								),
							},
						},
					)
				)

				expect(
					result
					.current
					.getValidationType()
				)
				.toBe(
					validationTypes
					.change
				)
			}
		)

		test(
			'sets to `submit` type when calling the setter',
			() => {
				const {
					result,
				} = (
					renderHook(
						useValidationType,
						{
							initialProps: {
								hasChangeValidation: (
									true
								),
							},
						},
					)
				)

				act(() => {
					result
					.current
					.setValidationTypeSubmit()
				})

				expect(
					result
					.current
					.getValidationType()
				)
				.toBe(
					validationTypes
					.submit
				)
			}
		)
	}
)
