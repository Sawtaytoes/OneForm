import {
	act,
	renderHook,
} from '@testing-library/react-hooks'

import OneForm from './OneForm.jsx'
import useFieldVisitation from './useFieldVisitation.js'

describe(
	'useFieldVisitation',
	() => {
		test(
			'have an `undefined` value',
			() => {
				const {
					result,
				} = (
					renderHook(
						useFieldVisitation,
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
					.isVisited
				)
				.toBeUndefined()
			}
		)

		test(
			'set visited',
			() => {
				const {
					result,
				} = (
					renderHook(
						useFieldVisitation,
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
					.setVisited()
				})

				expect(
					result
					.current
					.isVisited
				)
				.toBe(
					true
				)
			}
		)

		test(
			'get the latest set value',
			() => {
				const {
					result,
				} = (
					renderHook(
						useFieldVisitation,
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
					.setVisited()
				})

				act(() => {
					result
					.current
					.setVisited()
				})

				expect(
					result
					.current
					.isVisited
				)
				.toBe(
					true
				)
			}
		)
	}
)
