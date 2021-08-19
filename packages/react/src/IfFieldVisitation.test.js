import {
  render,
  screen,
} from '@testing-library/react'

import IfFieldVisitation from './IfFieldVisitation.jsx'
import OneForm from './OneForm.jsx'

describe(
  'IfFieldVisitation',
  () => {
    test(
      'hides children when field not visited.',
      () => {
        const children = 'Hello World!'

        render(
          <OneForm>
            <IfFieldVisitation
              name="email"
            >
              {children}
            </IfFieldVisitation>
          </OneForm>
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
      'shows a children when visited.',
      () => {
        const children = 'Hello World!'

        render(
          <OneForm
            values={{
              email: 'john.smith@test.com',
            }}
          >
            <IfFieldVisitation
              name="email"
            >
              {children}
            </IfFieldVisitation>
          </OneForm>
        )

        expect(
          screen
          .getByText(
            'Hello World!'
          )
        )
        .toBeTruthy()
      },
    )

    test(
      'shows the fallback when not visited.',
      () => {
        const children = 'Hello World!'
        const fallbackValue = 'Goodbye World!'

        render(
          <OneForm>
            <IfFieldVisitation
              fallback={fallbackValue}
              name="email"
            >
              {children}
            </IfFieldVisitation>
          </OneForm>
        )

        expect(
          screen
          .getByText(
            fallbackValue
          )
        )
        .toBeTruthy()

        expect(
          screen
          .getByRole(
            'form'
          )
          .innerHTML
        )
        .toBe(
          fallbackValue
        )
      },
    )

    test(
      'shows only children and not the fallback.',
      () => {
        const children = 'Hello World!'
        const fallbackValue = 'Goodbye World!'

        render(
          <OneForm
            values={{
              email: 'john.smith@test.com',
            }}
          >
            <IfFieldVisitation
              fallback={fallbackValue}
              name="email"
            >
              {children}
            </IfFieldVisitation>
          </OneForm>
        )

        expect(
          screen
          .getByText(
            children
          )
        )
        .toBeTruthy()

        expect(
          screen
          .getByRole(
            'form'
          )
          .innerHTML
        )
        .toBe(
          children
        )
      },
    )
  }
)
