import {
  render,
  screen,
} from '@testing-library/react'

import FieldValue from './FieldValue.jsx'
import IfFieldValue from './IfFieldValue.jsx'
import OneForm from './OneForm.jsx'

describe(
  'IfFieldValue',
  () => {
    test(
      'shows no value when none exists.',
      () => {
        const emailValue = ''

        render(
          <OneForm
            values={{
              email: emailValue,
            }}
          >
            <IfFieldValue
              name="email"
            >
              Email:
              <FieldValue
                name="email"
              />
            </IfFieldValue>
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
      'shows a value when one exists.',
      () => {
        const emailValue = 'john.smith@test.com'

        render(
          <OneForm
            values={{
              email: emailValue,
            }}
          >
            <IfFieldValue
              name="email"
            >
              <FieldValue
                name="email"
              />
            </IfFieldValue>
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
      'shows the fallback when no value.',
      () => {
        const emailValue = ''
        const fallbackValue = 'your.email@test.com'

        render(
          <OneForm
            values={{
              email: emailValue,
            }}
          >
            <IfFieldValue
              fallback={fallbackValue}
              name="email"
            >
              <FieldValue
                name="email"
              />
            </IfFieldValue>
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
      'shows only the value and not the fallback.',
      () => {
        const emailValue = 'john.smith@test.com'
        const fallbackValue = 'your.email@test.com'

        render(
          <OneForm
            values={{
              email: emailValue,
            }}
          >
            <IfFieldValue
              fallback={fallbackValue}
              name="email"
            >
              <FieldValue
                name="email"
              />
            </IfFieldValue>
          </OneForm>
        )

        expect(
          screen
          .getByText(
            emailValue
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
          emailValue
        )
      },
    )


    test(
      'shows no value when set invisible.',
      () => {
        const emailValue = 'john.smith'

        render(
          <OneForm
            values={{
              email: emailValue,
            }}
          >
            <IfFieldValue
              getIsVisible={(
                value,
              ) => (
                value
                === 'john.smith@test.com'
              )}
              name="email"
            >
              <FieldValue
                name="email"
              />
            </IfFieldValue>
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
      'shows the fallback when set invisible.',
      () => {
        const emailValue = 'john.smith'
        const fallbackValue = 'your.email@test.com'

        render(
          <OneForm
            values={{
              email: emailValue,
            }}
          >
            <IfFieldValue
              fallback={fallbackValue}
              getIsVisible={(
                value,
              ) => (
                value
                === 'john.smith@test.com'
              )}
              name="email"
            >
              <FieldValue
                name="email"
              />
            </IfFieldValue>
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
      'shows only the value when set visible.',
      () => {
        const emailValue = 'john.smith@test.com'
        const fallbackValue = 'your.email@test.com'

        render(
          <OneForm
            values={{
              email: emailValue,
            }}
          >
            <IfFieldValue
              fallback={fallbackValue}
              getIsVisible={(
                value,
              ) => (
                value
                === 'john.smith@test.com'
              )}
              name="email"
            >
              <FieldValue
                name="email"
              />
            </IfFieldValue>
          </OneForm>
        )

        expect(
          screen
          .getByText(
            emailValue
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
          emailValue
        )
      },
    )
  }
)
