import {
	render,
	screen,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'

import OneForm from './OneForm.jsx'
import Field from './Field.jsx'

describe(
	'Field',
	() => {
		test(
			'keeps the props that were passed',
			() => {
				const props = {
					id: 'email',
					name: 'email',
					placeholder: 'Email',
				}

				render(
					<OneForm>
						<Field>
							<input
								{...props}
							/>
						</Field>
					</OneForm>
				)

				const domElement = (
					screen
					.getByRole(
						'textbox'
					)
				)

				expect({
					id: (
						domElement
						.id
					),
					name: (
						domElement
						.name
					),
					placeholder: (
						domElement
						.placeholder
					),
				})
				.toStrictEqual(
					props
				)
			},
		)

		test(
			'contains the given value when changed',
			() => {
				render(
					<OneForm>
						<Field>
							<input
								name="email"
							/>
						</Field>
					</OneForm>
				)

				const domElement = (
					screen
					.getByRole(
						'textbox'
					)
				)

				const value = 'a'

				userEvent
				.type(
					domElement,
					value,
				)

				expect(
					domElement
					.value
				)
				.toBe(
					value
				)
			},
		)

		test(
			'contains the last given value',
			() => {
				render(
					<OneForm>
						<Field>
							<input
								name="email"
							/>
						</Field>
					</OneForm>
				)

				const domElement = (
					screen
					.getByRole(
						'textbox'
					)
				)

				userEvent
				.type(
					domElement,
					'a',
				)

				userEvent
				.type(
					domElement,
					'b',
				)

				expect(
					domElement
					.value
				)
				.toBe(
					'ab'
				)
			},
		)

		test(
			'calls the given function on change',
			() => {
				const valueChanged = (
					jest
					.fn()
				)

				render(
					<OneForm>
						<Field>
							<input
								name="email"
								onChange={valueChanged}
							/>
						</Field>
					</OneForm>
				)

				const domElement = (
					screen
					.getByRole(
						'textbox'
					)
				)

				userEvent
				.type(
					domElement,
					'a',
				)

				userEvent
				.type(
					domElement,
					'b',
				)

				expect(
					valueChanged
				)
				.toHaveBeenCalledTimes(
					2
				)
			},
		)
	}
)
