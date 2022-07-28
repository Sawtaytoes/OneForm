import {
  render,
  screen,
} from '@testing-library/react'

import IfFieldVisitation from './IfFieldVisitation.jsx'
import OneFormProvider from './OneFormProvider.jsx'

describe(
  'IfFieldVisitation',
  () => {
    test(
      'hides children when field not visited.',
      () => {
        const children = 'Hello World!'

        render(
          <OneFormProvider>
            <IfFieldVisitation
              name="email"
            >
              {children}
            </IfFieldVisitation>
          </OneFormProvider>
        )

        expect(
          screen
          .queryByText(
            'Hello World!'
          )
        )
        .not
        .toBeInTheDocument()
      },
    )

    test(
      'shows a children when visited.',
      () => {
        const children = 'Hello World!'

        render(
          <OneFormProvider
            values={{
              email: 'john.smith@test.com',
            }}
          >
            <IfFieldVisitation
              name="email"
            >
              {children}
            </IfFieldVisitation>
          </OneFormProvider>
        )

        expect(
          screen
          .getByText(
            'Hello World!'
          )
        )
        .toBeVisible()
      },
    )

    test(
      'shows the fallback when not visited.',
      () => {
        const children = 'Hello World!'
        const fallbackValue = 'Goodbye World!'

        render(
          <OneFormProvider>
            <IfFieldVisitation
              fallback={fallbackValue}
              name="email"
            >
              {children}
            </IfFieldVisitation>
          </OneFormProvider>
        )

        expect(
          screen
          .getByText(
            fallbackValue
          )
        )
        .toBeVisible()
      },
    )

    test(
      'shows only children and not the fallback.',
      () => {
        const children = 'Hello World!'
        const fallbackValue = 'Goodbye World!'

        render(
          <OneFormProvider
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
          </OneFormProvider>
        )

        expect(
          screen
          .getByText(
            children
          )
        )
        .toBeVisible()
      },
    )
  }
)
