import {
  render,
  screen,
} from '@testing-library/react'

import FieldErrorMessage from './FieldErrorMessage.jsx'
import IfFieldErrorMessage from './IfFieldErrorMessage.jsx'
import OneForm from './OneForm.jsx'

describe(
  'IfFieldErrorMessage',
  () => {
    test(
      'shows no error when none exists.',
      () => {
        const errorMessage = ''

        render(
          <OneForm
            errorMessages={{
              email: errorMessage,
            }}
          >
            <IfFieldErrorMessage
              name="email"
            >
              Email:
              <FieldErrorMessage
                name="email"
              />
            </IfFieldErrorMessage>
          </OneForm>
        )

        expect(
          screen
          .getByRole(
            'form'
          )
          .innerHTML
        )
        .toBe(''
        )
      },
    )

    test(
      'shows an error when one exists.',
      () => {
        const errorMessage = 'You forgot the `@` sign!'

        render(
          <OneForm
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

    test(
      'shows the fallback when no value.',
      () => {
        const errorMessage = ''
        const fallbackValue = 'All clear.'

        render(
          <OneForm
            errorMessages={{
              email: errorMessage,
            }}
          >
            <IfFieldErrorMessage
              fallback={fallbackValue}
              name="email"
            >
              <FieldErrorMessage
                name="email"
              />
            </IfFieldErrorMessage>
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
        const errorMessage = 'You forgot the `@` sign!'
        const fallbackValue = 'All clear.'

        render(
          <OneForm
            errorMessages={{
              email: errorMessage,
            }}
          >
            <IfFieldErrorMessage
              fallback={fallbackValue}
              name="email"
            >
              <FieldErrorMessage
                name="email"
              />
            </IfFieldErrorMessage>
          </OneForm>
        )

        expect(
          screen
          .getByText(
            errorMessage
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
          errorMessage
        )
      },
    )


    test(
      'shows no value when set invisible.',
      () => {
        const errorMessage = 'john.smith'

        render(
          <OneForm
            errorMessages={{
              email: errorMessage,
            }}
          >
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
          </OneForm>
        )

        expect(
          screen
          .getByRole(
            'form'
          )
          .innerHTML
        )
        .toBe(''
        )
      },
    )

    test(
      'shows the fallback when set invisible.',
      () => {
        const errorMessage = 'john.smith'
        const fallbackValue = 'All clear.'

        render(
          <OneForm
            errorMessages={{
              email: errorMessage,
            }}
          >
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
        const errorMessage = 'You forgot the `@` sign!'
        const fallbackValue = 'All clear.'

        render(
          <OneForm
            errorMessages={{
              email: errorMessage,
            }}
          >
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
          </OneForm>
        )

        expect(
          screen
          .getByText(
            errorMessage
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
          errorMessage
        )
      },
    )
  }
)
