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
      'renders no errors when none provided',
      () => {
        render(
          <OneForm>
            <FieldErrorMessage
              name="email"
            />
          </OneForm>
        )

        expect(
          screen
          .getByRole(
            'form'
          )
          .innerHTML
        )
        .toContain('')
      },
    )

    test(
      'contains a single error message',
      () => {
        const errorMessage = (
          'You forgot the `@` sign!'
        )

        const errorMessages = {
          email: errorMessage,
        }

        render(
          <OneForm
            errorMessages={errorMessages}
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
