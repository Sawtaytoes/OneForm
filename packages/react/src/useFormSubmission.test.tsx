import {
  act,
  renderHook,
} from '@testing-library/react'
import {
  ReactElement,
} from 'react'

import { Field } from './Field'
import {
  OneFormProvider,
} from './OneFormProvider'
import {
  FormChangeState,
} from './useFormChangeState'
import { useFormSubmission } from './useFormSubmission'

// TODO: Test this later when the submission state API is finalized.
// import {
//   submissionStates,
// } from './useSubmissionState'

describe(
  'useFormSubmission',
  () => {
    test(
      'begins unchanged, invalid, and with no errors',
      () => {
        const Wrapper = ({
          children,
        }: {
          children: ReactElement,
        }) => (
          <OneFormProvider>
            <Field>
              <input name="name" />
            </Field>

            {children}
          </OneFormProvider>
        )

        const {
          result,
        } = (
          renderHook(
            useFormSubmission,
            {
              wrapper: Wrapper,
            },
          )
        )

        expect(
          result
          .current
          .formChangeState
        )
        .toBe(
          FormChangeState
          .unchanged
        )

        expect(
          result
          .current
          .isValid
        )
        .toBe(
          true
        )

        expect(
          result
          .current
          .isVisited
        )
        .toBe(
          false
        )

        expect(
          result
          .current
          .totalErrorMessages
        )
        .toBe(
          0
        )

        expect(
          result
          .current
          .totalUnvisitedFields
        )
        .toBe(
          1
        )

        expect(
          result
          .current
          .totalVisitedFields
        )
        .toBe(
          0
        )
      }
    )

    test(
      'changes the form state when a value is added',
      () => {
        const values = {
          name: 'John Smith',
        }

        const Wrapper = ({
          children,
        }: {
          children: ReactElement,
        }) => (
          <OneFormProvider values={values}>
            {children}
          </OneFormProvider>
        )

        const {
          result,
        } = (
          renderHook(
            useFormSubmission,
            {
              wrapper: Wrapper,
            },
          )
        )

        expect(
          result
          .current
          .formChangeState
        )
        .toBe(
          FormChangeState
          .staged
        )
      }
    )

    // This test works, but it's getting an `act` console.error for no reason.
    test(
      'changes the form state when submitted',
      async () => {
        const values = {
          name: 'John Smith',
        }

        const Wrapper = ({
          children,
        }: {
          children: ReactElement,
        }) => (
          <OneFormProvider values={values}>
            {children}
          </OneFormProvider>
        )

        const {
          result,
        } = (
          renderHook(
            useFormSubmission,
            {
              wrapper: Wrapper,
            },
          )
        )

        await act(async () => {
          result
          .current
          .submitForm()
        })

        expect(
          result
          .current
          .formChangeState
        )
        .toBe(
          FormChangeState
          .committed
        )
      }
    )

    test(
      'is invalid when values are invalid',
      () => {
        const validations = {
          name: [
            {
              errorMessage: 'Something is wrong with your name.',
              getIsValid: () => false,
            },
          ],
        }

        const values = {
          name: 'John Smith',
        }

        const Wrapper = ({
          children,
        }: {
          children: ReactElement,
        }) => (
          <OneFormProvider
            validations={validations}
            values={values}
          >
            <Field>
              <input name="name" />
            </Field>

            {children}
          </OneFormProvider>
        )

        const {
          result,
        } = (
          renderHook(
            useFormSubmission,
            {
              wrapper: Wrapper,
            },
          )
        )

        expect(
          result
          .current
          .isValid
        )
        .toBe(
          false
        )

        expect(
          result
          .current
          .totalErrorMessages
        )
        .toBe(
          1
        )
      }
    )

    test(
      'is only valid when values are valid',
      () => {
        const validations = {
          name: [
            {
              errorMessage: '',
              getIsValid: () => true,
            },
          ],
        }

        const values = {
          name: 'John Smith',
        }

        const Wrapper = ({
          children,
        }: {
          children: ReactElement,
        }) => (
          <OneFormProvider
            validations={validations}
            values={values}
          >
            <Field>
              <input name="name" />
            </Field>

            {children}
          </OneFormProvider>
        )

        const {
          result,
        } = (
          renderHook(
            useFormSubmission,
            {
              wrapper: Wrapper,
            },
          )
        )

        expect(
          result
          .current
          .isValid
        )
        .toBe(
          true
        )

        expect(
          result
          .current
          .totalErrorMessages
        )
        .toBe(
          0
        )
      }
    )

    test(
      'is visited when fields are visited',
      () => {
        const values = {
          name: 'John Smith',
        }

        const Wrapper = ({
          children,
        }: {
          children: ReactElement,
        }) => (
          <OneFormProvider values={values}>
            <Field>
              <input name="name" />
            </Field>

            {children}
          </OneFormProvider>
        )

        const {
          result,
        } = (
          renderHook(
            useFormSubmission,
            {
              wrapper: Wrapper,
            },
          )
        )

        expect(
          result
          .current
          .isVisited
        )
        .toBe(
          true
        )

        expect(
          result
          .current
          .totalUnvisitedFields
        )
        .toBe(
          0
        )

        expect(
          result
          .current
          .totalVisitedFields
        )
        .toBe(
          1
        )
      }
    )

    test(
      'is unvisited when some fields are unvisited',
      () => {
        const values = {
          name: 'John Smith',
        }

        const Wrapper = ({
          children,
        }: {
          children: ReactElement,
        }) => (
          <OneFormProvider values={values}>
            <Field>
              <input name="email" />
            </Field>

            <Field>
              <input name="name" />
            </Field>

            {children}
          </OneFormProvider>
        )

        const {
          result,
        } = (
          renderHook(
            useFormSubmission,
            {
              wrapper: Wrapper,
            },
          )
        )

        expect(
          result
          .current
          .isVisited
        )
        .toBe(
          false
        )

        expect(
          result
          .current
          .totalUnvisitedFields
        )
        .toBe(
          1
        )

        expect(
          result
          .current
          .totalVisitedFields
        )
        .toBe(
          1
        )
      }
    )

    test(
      'is visited when required fields are visited',
      () => {
        const values = {
          name: 'John Smith',
        }

        const Wrapper = ({
          children,
        }: {
          children: ReactElement,
        }) => (
          <OneFormProvider values={values}>
            <Field>
              <input name="email" />
            </Field>

            <Field>
              <input name="name" />
            </Field>

            {children}
          </OneFormProvider>
        )

        const {
          result,
        } = (
          renderHook(
            useFormSubmission,
            {
              initialProps: {
                requiredFieldNames: [
                  'name',
                ],
              },
              wrapper: Wrapper,
            },
          )
        )

        expect(
          result
          .current
          .isVisited
        )
        .toBe(
          true
        )

        expect(
          result
          .current
          .totalUnvisitedFields
        )
        .toBe(
          0
        )

        expect(
          result
          .current
          .totalVisitedFields
        )
        .toBe(
          1
        )
      }
    )

    test(
      'is unvisited when required fields are unvisited',
      () => {
        const Wrapper = ({
          children,
        }: {
          children: ReactElement,
        }) => (
          <OneFormProvider>
            <Field>
              <input name="email" />
            </Field>

            <Field>
              <input name="name" />
            </Field>

            {children}
          </OneFormProvider>
        )

        const {
          result,
        } = (
          renderHook(
            useFormSubmission,
            {
              initialProps: {
                requiredFieldNames: [
                  'name',
                ],
              },
              wrapper: Wrapper,
            },
          )
        )

        expect(
          result
          .current
          .isVisited
        )
        .toBe(
          false
        )

        expect(
          result
          .current
          .totalUnvisitedFields
        )
        .toBe(
          1
        )

        expect(
          result
          .current
          .totalVisitedFields
        )
        .toBe(
          0
        )
      }
    )
  }
)
