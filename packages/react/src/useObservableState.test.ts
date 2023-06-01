import {
  act,
  renderHook,
} from '@testing-library/react'

import {
  useObservableState,
} from './useObservableState'

describe(
  'useObservableState',
  () => {
    test(
      'publishes values to subscribers',
      () => {
        const {
          result,
        } = (
          renderHook(
            useObservableState<
              string
            >
          )
        )

        const subscriber = (
          jest
          .fn()
        )

        const value = 'John Smith'

        act(() => {
          const unsubscribe1 = (
            result
            .current
            .subscribeToValue({
              identifier: 'name',
              subscriber,
            })
          )

          const unsubscribe2 = (
            result
            .current
            .subscribeToValue({
              identifier: 'name',
              subscriber,
            })
          )

          result
          .current
          .publishValue(
            'name',
            value,
          )

          unsubscribe1()
          unsubscribe2()
        })

        expect(
          subscriber
        )
        .toHaveBeenCalledTimes(
          2
        )

        expect(
          subscriber
        )
        .toHaveBeenNthCalledWith(
          1,
          value,
        )

        expect(
          subscriber
        )
        .toHaveBeenNthCalledWith(
          2,
          value,
        )
      }
    )

    test(
      'publishes multiple values to subscribers',
      () => {
        const {
          result,
        } = (
          renderHook(
            useObservableState<
              string
            >
          )
        )

        const subscriber = (
          jest
          .fn()
        )

        const value1 = 'John Smith'
        const value2 = 'Jane of the Jungle'

        act(() => {
          const unsubscribe1 = (
            result
            .current
            .subscribeToValue({
              identifier: 'name',
              subscriber,
            })
          )

          const unsubscribe2 = (
            result
            .current
            .subscribeToValue({
              identifier: 'name',
              subscriber,
            })
          )

          result
          .current
          .publishValue(
            'name',
            value1,
          )

          result
          .current
          .publishValue(
            'name',
            value2,
          )

          unsubscribe1()
          unsubscribe2()
        })

        expect(
          subscriber
        )
        .toHaveBeenCalledTimes(
          4
        )

        expect(
          subscriber
        )
        .toHaveBeenNthCalledWith(
          1,
          value1,
        )

        expect(
          subscriber
        )
        .toHaveBeenNthCalledWith(
          2,
          value1,
        )

        expect(
          subscriber
        )
        .toHaveBeenNthCalledWith(
          3,
          value2,
        )

        expect(
          subscriber
        )
        .toHaveBeenNthCalledWith(
          4,
          value2,
        )
      }
    )

    test(
      'allows publishing null values to subscribers',
      () => {
        const {
          result,
        } = (
          renderHook(
            useObservableState<
              | string
              | null
            >
          )
        )

        const subscriber = (
          jest
          .fn()
        )

        const emailValue = 'john.smith@test.com'
        const nameValue = 'John Smith'

        act(() => {
          const unsubscribe1 = (
            result
            .current
            .subscribeToValue({
              identifier: 'email',
              subscriber,
            })
          )

          const unsubscribe2 = (
            result
            .current
            .subscribeToValue({
              identifier: 'name',
              subscriber,
            })
          )

          result
          .current
          .publishValue(
            'email',
            emailValue,
          )

          result
          .current
          .publishValue(
            'name',
            nameValue,
          )

          ;[
            'email',
            'name',
          ]
          .forEach((
            identifier,
          ) => {
            result
            .current
            .publishValue(
              identifier,
              null,
            )
          })

          unsubscribe1()
          unsubscribe2()
        })

        expect(
          subscriber
        )
        .toHaveBeenCalledTimes(
          4
        )

        expect(
          subscriber
        )
        .toHaveBeenNthCalledWith(
          1,
          emailValue,
        )

        expect(
          subscriber
        )
        .toHaveBeenNthCalledWith(
          2,
          nameValue,
        )

        expect(
          subscriber
        )
        .toHaveBeenNthCalledWith(
          3,
          null,
        )

        expect(
          subscriber
        )
        .toHaveBeenNthCalledWith(
          4,
          null,
        )
      }
    )
  }
)
