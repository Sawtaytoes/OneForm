import {
	act,
	renderHook,
} from '@testing-library/react-hooks'

import OneForm from './OneForm.jsx'
import useFieldRegistration from './useFieldRegistration.js'

describe(
	'useFieldRegistration',
	() => {
		test(
			'returns an `unregister` function',
			() => {
				const {
					result,
				} = (
					renderHook(
						useFieldRegistration,
						{
							initialProps: {
								fieldName: 'email',
							},
							wrapper: OneForm,
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
						.register()
					)
				})

				expect(
					unregisterRef
					.current
				)
				.toBeInstanceOf(
					Function
				)
			}
		)
	}
)
