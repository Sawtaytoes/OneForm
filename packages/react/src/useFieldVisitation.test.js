import {
  act,
  renderHook,
} from '@testing-library/react-hooks'

import OneForm from './OneForm.jsx'
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
              wrapper: OneForm,
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
              wrapper: OneForm,
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
              wrapper: OneForm,
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
