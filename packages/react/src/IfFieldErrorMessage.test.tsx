import {
  render,
  screen,
} from '@testing-library/react'

import {
  FieldErrorMessage,
} from './FieldErrorMessage'
import {
  IfFieldErrorMessage,
} from './IfFieldErrorMessage'
import {
  OneFormProvider,
} from './OneFormProvider'

describe(
  'IfFieldErrorMessage',
  () => {
    test(
      'shows no error when none exists.',
      () => {
        const errorMessage = ''

        render(
          <OneFormProvider
            errorMessages={{
              email: errorMessage,
            }}
          >
            <form role="form">
              <IfFieldErrorMessage
                name="email"
              >
                Email:
                <FieldErrorMessage
                  name="email"
                />
              </IfFieldErrorMessage>
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
      'shows an error when one exists.',
      () => {
        const errorMessage = 'You forgot the `@` sign!'

        render(
          <OneFormProvider
            errorMessages={{
              email: errorMessage,
            }}
          >
            <IfFieldErrorMessage
              name="email"
            >
              <FieldErrorMessage
                name="email"
              />
            </IfFieldErrorMessage>
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

    test(
      'shows the fallback when no value.',
      () => {
        const errorMessage = ''
        const fallbackValue = 'All clear.'

        render(
          <OneFormProvider
            errorMessages={{
              email: errorMessage,
            }}
          >
            <form role="form">
              <IfFieldErrorMessage
                fallback={fallbackValue}
                name="email"
              >
                <FieldErrorMessage
                  name="email"
                />
              </IfFieldErrorMessage>
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
        const errorMessage = 'You forgot the `@` sign!'
        const fallbackValue = 'All clear.'

        render(
          <OneFormProvider
            errorMessages={{
              email: errorMessage,
            }}
          >
            <form role="form">
              <IfFieldErrorMessage
                fallback={fallbackValue}
                name="email"
              >
                <FieldErrorMessage
                  name="email"
                />
              </IfFieldErrorMessage>
            </form>
          </OneFormProvider>
        )

        expect(
          screen
          .getByText(
            errorMessage
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
          errorMessage
        )
      },
    )

    test(
      'shows no value when set invisible.',
      () => {
        const errorMessage = 'john.smith'

        render(
          <OneFormProvider
            errorMessages={{
              email: errorMessage,
            }}
          >
            <form role="form">
              <IfFieldErrorMessage
                getIsVisible={([
                  errorMessage,
                ]) => (
                  errorMessage
                  === 'You forgot the `@` sign!'
                )}
                name="email"
              >
                <FieldErrorMessage
                  name="email"
                />
              </IfFieldErrorMessage>
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
        const errorMessage = 'john.smith'
        const fallbackValue = 'All clear.'

        render(
          <OneFormProvider
            errorMessages={{
              email: errorMessage,
            }}
          >
            <form role="form">
              <IfFieldErrorMessage
                fallback={fallbackValue}
                getIsVisible={([
                  errorMessage,
                ]) => (
                  errorMessage
                  === 'You forgot the `@` sign!'
                )}
                name="email"
              >
                <FieldErrorMessage
                  name="email"
                />
              </IfFieldErrorMessage>
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
        const errorMessage = 'You forgot the `@` sign!'
        const fallbackValue = 'All clear.'

        render(
          <OneFormProvider
            errorMessages={{
              email: errorMessage,
            }}
          >
            <form role="form">
              <IfFieldErrorMessage
                fallback={fallbackValue}
                getIsVisible={([
                  errorMessage,
                ]) => (
                  errorMessage
                  === 'You forgot the `@` sign!'
                )}
                name="email"
              >
                <FieldErrorMessage
                  name="email"
                />
              </IfFieldErrorMessage>
            </form>
          </OneFormProvider>
        )

        expect(
          screen
          .getByText(
            errorMessage
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
          errorMessage
        )
      },
    )
  }
)
