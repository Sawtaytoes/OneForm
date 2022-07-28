import {
  act,
  renderHook,
} from '@testing-library/react'

import OneFormProvider from './OneFormProvider.jsx'
import useFieldErrorMessages from './useFieldErrorMessages.js'

describe(
  'useFieldErrorMessages',
  () => {
    test(
      'has null array when no initial error messages',
      () => {
        const {
          result,
        } = (
          renderHook(
            useFieldErrorMessages,
            {
              initialProps: {
                name: 'email',
              },
              wrapper: OneFormProvider,
            },
          )
        )

        expect(
          result
          .current
          .errorMessages
        )
        .toEqual(
          []
        )
      }
    )

    test(
      'sets the error messages',
      () => {
        const {
          result,
        } = (
          renderHook(
            useFieldErrorMessages,
            {
              initialProps: {
                name: 'email',
              },
              wrapper: OneFormProvider,
            },
          )
        )

        const errorMessages = [
          'This is an error!',
          'This is another error!',
        ]

        act(() => {
          result
          .current
          .setErrorMessages(
            errorMessages
          )
        })

        expect(
          result
          .current
          .errorMessages
        )
        .toEqual(
          errorMessages
        )
      }
    )

    test(
      'gets the latest set error messages',
      () => {
        const {
          result,
        } = (
          renderHook(
            useFieldErrorMessages,
            {
              initialProps: {
                name: 'email',
              },
              wrapper: OneFormProvider,
            },
          )
        )

        act(() => {
          result
          .current
          .setErrorMessages([
            'You did something wrong.',
          ])
        })

        const errorMessages = [
          'This is an error!',
          'This is another error!',
        ]

        act(() => {
          result
          .current
          .setErrorMessages(
            errorMessages
          )
        })

        expect(
          result
          .current
          .errorMessages
        )
        .toEqual(
          errorMessages
        )
      }
    )
  }
)
