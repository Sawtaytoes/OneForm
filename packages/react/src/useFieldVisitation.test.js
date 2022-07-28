import {
  act,
  renderHook,
} from '@testing-library/react'

import OneFormProvider from './OneFormProvider.jsx'
import useFieldVisitation from './useFieldVisitation.js'

describe(
  'useFieldVisitation',
  () => {
    test(
      'is not visited',
      () => {
        const {
          result,
        } = (
          renderHook(
            useFieldVisitation,
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
          .isVisited
        )
        .toBe(
          false
        )
      }
    )

    test(
      'is visited when set visited',
      () => {
        const {
          result,
        } = (
          renderHook(
            useFieldVisitation,
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
          .setVisited()
        })

        expect(
          result
          .current
          .isVisited
        )
        .toBe(
          true
        )
      }
    )

    test(
      'is still visited even after visiting multiple times',
      () => {
        const {
          result,
        } = (
          renderHook(
            useFieldVisitation,
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
          .setVisited()
        })

        act(() => {
          result
          .current
          .setVisited()
        })

        expect(
          result
          .current
          .isVisited
        )
        .toBe(
          true
        )
      }
    )
  }
)
