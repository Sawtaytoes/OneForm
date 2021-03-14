import {
	act,
	renderHook,
} from '@testing-library/react-hooks'

import OneForm from './OneForm.jsx'
import useFieldValue from './useFieldValue.js'

describe(
	'useFieldValue',
	() => {
		test(
			'should have an `undefined` value',
			() => {
				const {
					result,
				} = (
					renderHook(
						useFieldValue,
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
						useFieldValue,
						{
							initialProps: {
								name: 'email',
							},
							wrapper: OneForm,
						},
					)
				)

				const value = 'john.smith@test.com'

				act(() => {
					result
					.current
					.setValue(
						value
					)
				})

				expect(
					result
					.current
					.value
				)
				.toBe(
					value
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
						useFieldValue,
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
					.setValue(
						'jane.of.the.jungle@jungletech.com'
					)
				})

				const value = 'john.smith@test.com'

				act(() => {
					result
					.current
					.setValue(
						value
					)
				})

				expect(
					result
					.current
					.value
				)
				.toBe(
					value
				)
			}
		)
	}
)
