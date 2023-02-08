import {
  render,
  screen,
} from '@testing-library/react'

import {
  FieldValue,
} from './FieldValue'
import {
  IfFieldValue,
} from './IfFieldValue'
import {
  OneFormProvider,
} from './OneFormProvider'

describe(
  'IfFieldValue',
  () => {
    test(
      'shows no value when none exists.',
      () => {
        const emailValue = ''

        render(
          <OneFormProvider
            values={{
              email: emailValue,
            }}
          >
            <form role="form">
              <IfFieldValue
                name="email"
              >
                Email:
                <FieldValue
                  name="email"
                />
              </IfFieldValue>
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
      'shows a value when one exists.',
      () => {
        const emailValue = 'john.smith@test.com'

        render(
          <OneFormProvider
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
          </OneFormProvider>
        )

        expect(
          screen
          .getByText(
            emailValue
          )
        )
        .toBeVisible()
      },
    )

    test(
      'shows the fallback when no value.',
      () => {
        const emailValue = ''
        const fallbackValue = 'your.email@test.com'

        render(
          <OneFormProvider
            values={{
              email: emailValue,
            }}
          >
            <form role="form">
              <IfFieldValue
                fallback={fallbackValue}
                name="email"
              >
                <FieldValue
                  name="email"
                />
              </IfFieldValue>
            </form>
          </OneFormProvider>
        )

        expect(
          screen
          .getByText(
            fallbackValue
          )
        )
        .toBeVisible()

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
          <OneFormProvider
            values={{
              email: emailValue,
            }}
          >
            <form role="form">
              <IfFieldValue
                fallback={fallbackValue}
                name="email"
              >
                <FieldValue
                  name="email"
                />
              </IfFieldValue>
            </form>
          </OneFormProvider>
        )

        expect(
          screen
          .getByText(
            emailValue
          )
        )
        .toBeVisible()

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
          <OneFormProvider
            values={{
              email: emailValue,
            }}
          >
            <form role="form">
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
      'shows the fallback when set invisible.',
      () => {
        const emailValue = 'john.smith'
        const fallbackValue = 'your.email@test.com'

        render(
          <OneFormProvider
            values={{
              email: emailValue,
            }}
          >
            <form role="form">
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
            </form>
          </OneFormProvider>
        )

        expect(
          screen
          .getByText(
            fallbackValue
          )
        )
        .toBeVisible()

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
          <OneFormProvider
            values={{
              email: emailValue,
            }}
          >
            <form role="form">
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
            </form>
          </OneFormProvider>
        )

        expect(
          screen
          .getByText(
            emailValue
          )
        )
        .toBeVisible()

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
