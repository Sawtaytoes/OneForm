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
			'starts as `change` type by default',
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
