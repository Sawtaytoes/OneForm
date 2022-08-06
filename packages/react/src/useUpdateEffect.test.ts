import {
  renderHook,
} from '@testing-library/react'

import {
  useUpdateEffect,
} from './useUpdateEffect'

describe(
  'useUpdateEffect',
  () => {
    test(
      'does not call callback on first render',
      () => {
        const callback = (
          jest
          .fn()
        )

        renderHook(
          ({
            callback,
            dependencies,
          }) => (
            useUpdateEffect(
              callback,
              dependencies,
            )
          ),
          {
            initialProps: {
              callback,
              dependencies: [
                null,
              ],
            },
          },
        )

        expect(
          callback
        )
        .toHaveBeenCalledTimes(0)
      },
    )

    test(
      'calls callback on subsequent renders',
      () => {
        const callback = (
          jest
          .fn()
        )

        const {
          rerender,
        } = (
          renderHook(
            ({
              callback,
              dependencies,
            }) => (
              useUpdateEffect(
                callback,
                dependencies,
              )
            ),
            {
              initialProps: {
                callback,
                dependencies: [
                  null,
                ],
              },
            },
          )
        )

        rerender({
          callback,
          dependencies: [
            '',
          ],
        })

        expect(
          callback
        )
        .toHaveBeenCalledTimes(1)
      },
    )
  }
)
