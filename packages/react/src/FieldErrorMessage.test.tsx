import {
  render,
  screen,
} from '@testing-library/react'

import {
  FieldErrorMessage,
} from './FieldErrorMessage'
import {
  OneFormProvider,
} from './OneFormProvider'

describe(
  'FieldErrorMessage',
  () => {
    test(
      'renders no errors when none provided',
      () => {
        render(
          <OneFormProvider>
            <form role="form">
              <FieldErrorMessage
                name="email"
              />
            </form>
          </OneFormProvider>
        )

        expect(
          screen
          .getByRole(
            'form'
          )
          .innerHTML
        )
        .toBe(
          ''
        )
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
          <OneFormProvider
            errorMessages={errorMessages}
          >
            <FieldErrorMessage
              name="email"
            />
          </OneFormProvider>
        )

        expect(
          screen
          .getByText(
            errorMessage
          )
        )
        .toBeVisible()
      },
    )
  }
)
