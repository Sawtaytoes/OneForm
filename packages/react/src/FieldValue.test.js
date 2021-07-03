import {
  render,
  screen,
} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import OneForm from './OneForm.jsx'
import FieldValue from './FieldValue.jsx'

describe(
  'FieldValue',
  () => {
    test(
      'contains the given value when in context',
      () => {
        const emailValue = 'john.smith@test.com'

        render(
          <OneForm
            values={{
              email: emailValue,
            }}
          >
            <FieldValue
              name="email"
            />
          </OneForm>
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
          <OneForm
            updatedValues={{
              email: emailValue,
            }}
          >
            <FieldValue
              name="email"
            />
          </OneForm>
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
