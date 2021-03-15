import {
	render,
	screen,
} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import FieldErrorMessage from './FieldErrorMessage.jsx'
import OneForm from './OneForm.jsx'

describe(
	'FieldErrorMessage',
	() => {
		test(
			'contains a single error message',
			() => {
				const errorMessage = (
					'You forgot the `@` sign!'
				)

				const fieldErrorMessages = {
					email: [
						errorMessage,
					],
				}

				render(
					<OneForm
						errorMessages={fieldErrorMessages}
					>
						<FieldErrorMessage
							name="email"
						/>
					</OneForm>
				)

				expect(
					screen
					.getByText(
						errorMessage
					)
				)
				.toBeTruthy()
			},
		)
	}
)
