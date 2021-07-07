import {
  act,
  renderHook,
} from '@testing-library/react-hooks'

import useVisitationState from './useVisitationState.js'

describe(
  'useVisitationState',
  () => {
    test(
      'values are initially not visited',
      () => {
        const {
          result,
        } = (
          renderHook(
            useVisitationState,
          )
        )

        expect(
          result
          .current
          .getIsVisited(
            'email'
          )
        )
        .toBe(
          false
        )
      },
    )

    test(
      'values are visisted after visiting',
      () => {
        const {
          result,
        } = (
          renderHook(
            useVisitationState,
          )
        )

        act(() => {
          result
          .current
          .setVisited(
            'email'
          )
        })

        expect(
          result
          .current
          .getIsVisited(
            'email'
          )
        )
        .toBe(
          true
        )
      },
    )

    test(
      'visiting multiple values only visits those values',
      () => {
        const {
          result,
        } = (
          renderHook(
            useVisitationState,
          )
        )

        act(() => {
          result
          .current
          .setVisited(
            'email'
          )
        })

        act(() => {
          result
          .current
          .setVisited(
            'name'
          )
        })

        expect(
          result
          .current
          .getIsVisited(
            'email'
          )
        )
        .toBe(
          true
        )

        expect(
          result
          .current
          .getIsVisited(
            'name'
          )
        )
        .toBe(
          true
        )

        expect(
          result
          .current
          .getIsVisited(
            'nickname'
          )
        )
        .toBe(
          false
        )
      },
    )

    test(
      'resetting visitations marks all values as not visited',
      () => {
        const {
          result,
        } = (
          renderHook(
            useVisitationState,
          )
        )

        act(() => {
          result
          .current
          .setVisited(
            'email'
          )
        })

        act(() => {
          result
          .current
          .setVisited(
            'name'
          )
        })

        act(() => {
          result
          .current
          .resetAllVisitations()
        })

        expect(
          result
          .current
          .getIsVisited(
            'email'
          )
        )
        .toBe(
          false
        )

        expect(
          result
          .current
          .getIsVisited(
            'name'
          )
        )
        .toBe(
          false
        )
      },
    )

    test(
      'notifies when visits occur',
      () => {
        const onVisit = (
          jest
          .fn()
        )

        const {
          result,
        } = (
          renderHook(
            useVisitationState,
            {
              initialProps: {
                onVisit,
              },
            },
          )
        )

        act(() => {
          result
          .current
          .setVisited(
            'email'
          )
        })

        expect(
          onVisit
        )
        .toHaveBeenCalledTimes(
          1
        )

        expect(
          onVisit
        )
        .toHaveBeenCalledWith(
          'email',
        )
      }
    )
  }
)
