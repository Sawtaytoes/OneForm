import {
  act,
  renderHook,
} from '@testing-library/react'

import OneFormProvider from './OneFormProvider.jsx'
import {
  useFieldRegistration,
} from './useFieldRegistration'

describe(
  'useFieldRegistration',
  () => {
    test(
      'returns an `unregister` function',
      () => {
        const {
          result,
        } = (
          renderHook(
            useFieldRegistration,
            {
              initialProps: {
                name: 'email',
              },
              wrapper: OneFormProvider,
            },
          )
        )

        const unregisterRef: {
          current: (
            | (
              (unregister: () => void) => (
                void
              )
            )
            | null
          ),
        } = {
          current: null,
        }

        act(() => {
          unregisterRef
          .current = (
            result
            .current
            .register()
          )
        })

        expect(
          unregisterRef
          .current
        )
        .toBeInstanceOf(
          Function
        )
      }
    )
  }
)
