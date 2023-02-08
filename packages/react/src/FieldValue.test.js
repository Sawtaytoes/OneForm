import {
  render,
  screen,
} from '@testing-library/react'

import {
  OneFormProvider ,
} from './OneFormProvider '
import FieldValue from './FieldValue'

describe(
  'FieldValue',
  () => {
    test(
      'contains the given value when in context',
      () => {
        const emailValue = 'john.smith@test.com'

        render(
          <OneFormProvider
            values={{
              email: emailValue,
            }}
          >
            <FieldValue
              name="email"
            />
          </OneFormProvider>
        )

        expect(
          screen
          .getByText(
            emailValue
          )
        )
        .toBeTruthy()
      },
    )

    test(
      'contains the given value when merged in context',
      () => {
        const emailValue = 'john.smith@test.com'

        render(
          <OneFormProvider
            updatedValues={{
              email: emailValue,
            }}
          >
            <FieldValue
              name="email"
            />
          </OneFormProvider>
        )

        expect(
          screen
          .getByText(
            emailValue
          )
        )
        .toBeTruthy()
      },
    )
  }
)
