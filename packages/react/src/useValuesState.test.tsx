import {
  act,
  renderHook,
} from '@testing-library/react'

import {
  useValuesState,
} from './useValuesState'

type ValueRef = {
  current: (
    | string
    | undefined
  )
}

describe(
  'useValuesState',
  () => {
    test(
      'publish values to subscribers',
      () => {
        const {
          result,
        } = (
          renderHook(
            useValuesState<
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
          .setValue(
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
      'publish multiple values to subscribers',
      () => {
        const {
          result,
        } = (
          renderHook(
            useValuesState<
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
          .setValue(
            'name',
            value1,
          )

          result
          .current
          .setValue(
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
      'set values on a single identifier',
      () => {
        const {
          result,
        } = (
          renderHook(
            useValuesState<
              string
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
          const unsubscribe = (
            result
            .current
            .subscribeToValue({
              identifier: 'name',
              subscriber,
            })
          )
          
          result
          .current
          .setValue(
            'name',
            nameValue,
          )

          result
          .current
          .setValue(
            'email',
            emailValue,
          )

          unsubscribe()
        })

        expect(
          subscriber
        )
        .toHaveBeenCalledTimes(
          1
        )

        expect(
          subscriber
        )
        .toHaveBeenNthCalledWith(
          1,
          nameValue,
        )
      }
    )

    test(
      'get the set value',
      () => {
        const {
          result,
        } = (
          renderHook(
            useValuesState<
              string
            >
          )
        )

        const value = 'John Smith'

        act(() => {
          result
          .current
          .setValue(
            'name',
            value,
          )
        })

        const valueRef: (
          ValueRef
        ) = {
          current: '',
        }

        act(() => {
          valueRef
          .current = (
            result
            .current
            .getValue(
              'name',
            )
          )
        })

        expect(
          valueRef
          .current
        )
        .toBe(
          value
        )
      }
    )

    test(
      'have no value when none set',
      () => {
        const {
          result,
        } = (
          renderHook(
            useValuesState<
              string
            >
          )
        )

        const valueRef: (
          ValueRef
        ) = {
          current: '',
        }

        act(() => {
          valueRef
          .current = (
            result
            .current
            .getValue(
              'name',
            )
          )
        })

        expect(
          valueRef
          .current
        )
        .toBeUndefined()
      }
    )

    test(
      'notifies when changes occur',
      () => {
        const changeCallback = (
          jest
          .fn()
        )

        const {
          result,
        } = (
          renderHook(
            (
              useValuesState<
                string
              >
            ),
            {
              initialProps: {
                onChange: (
                  changeCallback
                ),
              },
            }
          )
        )

        const identifier = 'email'
        const value1 = 'jane.of.the.jungle@test.com'
        const value2 = 'john.smith@test.com'

        act(() => {
          result
          .current
          .setValue(
            identifier,
            value1,
          )
          
          result
          .current
          .setValue(
            identifier,
            value2,
          )
        })

        expect(
          changeCallback
        )
        .toHaveBeenCalledTimes(
          2
        )

        expect(
          changeCallback
        )
        .toHaveBeenNthCalledWith(
          1,
          {
            identifier,
            value: value1,
            values: {
              [identifier]: (
                value1
              ),
            },
          },
        )

        expect(
          changeCallback
        )
        .toHaveBeenNthCalledWith(
          2,
          {
            identifier,
            value: value2,
            values: {
              [identifier]: (
                value2
              ),
            },
          },
        )
      }
    )

    test(
      'notifies newest callback when a change occurs',
      () => {
        const changeCallback1 = (
          jest
          .fn()
        )

        const changeCallback2 = (
          jest
          .fn()
        )

        const {
          rerender,
          result,
        } = (
          renderHook(
            (
              useValuesState<
                string
              >
            ),
            {
              initialProps: {
                onChange: (
                  changeCallback1
                ),
              },
            }
          )
        )

        const identifier = 'email'
        const value1 = 'jane.of.the.jungle@test.com'
        const value2 = 'john.smith@test.com'

        act(() => {
          result
          .current
          .setValue(
            identifier,
            value1,
          )
        })

        rerender({
          onChange: (
            changeCallback2
          ),
        })

        act(() => {
          result
          .current
          .setValue(
            identifier,
            value2,
          )
        })

        expect(
          changeCallback1
        )
        .toHaveBeenCalledTimes(
          1
        )

        expect(
          changeCallback1
        )
        .toHaveBeenCalledWith({
          identifier,
          value: value1,
          values: {
            [identifier]: (
              value1
            ),
          },
        })

        expect(
          changeCallback2
        )
        .toHaveBeenCalledTimes(
          1
        )

        expect(
          changeCallback2
        )
        .toHaveBeenCalledWith({
          identifier,
          value: value2,
          values: {
            [identifier]: (
              value2
            ),
          },
        })
      }
    )

    test(
      'initializes with merged values',
      () => {
        const emailValue = 'john.smith@test.com'
        const nameValue = 'John Smith'

        const {
          result,
        } = (
          renderHook(
            (
              useValuesState<
                string
              >
            ),
            {
              initialProps: {
                updatedValues: {
                  email: (
                    emailValue
                  ),
                  name: (
                    nameValue
                  ),
                },
              },
            },
          )
        )

        const nameValueRef: (
          ValueRef
        ) = {
          current: '',
        }

        act(() => {
          nameValueRef
          .current = (
            result
            .current
            .getValue(
              'name',
            )
          )
        })

        const emailValueRef: (
          ValueRef
        ) = {
          current: '',
        }

        act(() => {
          emailValueRef
          .current = (
            result
            .current
            .getValue(
              'email',
            )
          )
        })

        expect(
          emailValueRef
          .current
        )
        .toBe(
          emailValue
        )

        expect(
          nameValueRef
          .current
        )
        .toBe(
          nameValue
        )
      }
    )

    test(
      'merges values when values updates',
      () => {
        const {
          rerender,
          result,
        } = (
          renderHook(
            useValuesState<
              string
            >
          )
        )

        act(() => {
          result
          .current
          .setValue(
            'name',
            'John Smith',
          )
        })

        const emailValue = 'john.smith@test.com'

        act(() => {
          result
          .current
          .setValue(
            'email',
            emailValue,
          )
        })

        const nameValue = 'Jane of the Jungle'

        rerender({
          updatedValues: {
            name: nameValue,
          },
        })

        expect(
          result
          .current
          .getValue(
            'email',
          )
        )
        .toBe(
          emailValue
        )

        expect(
          result
          .current
          .getValue(
            'name',
          )
        )
        .toBe(
          nameValue
        )
      }
    )

    test(
      'initializes with overwritten values',
      () => {
        const emailValue = 'john.smith@test.com'
        const nameValue = 'John Smith'

        const {
          result,
        } = (
          renderHook(
            (
              useValuesState<
                string
              >
            ),
            {
              initialProps: {
                values: {
                  email: (
                    emailValue
                  ),
                  name: (
                    nameValue
                  ),
                },
              },
            },
          )
        )

        const nameValueRef: (
          ValueRef
        ) = {
          current: '',
        }

        act(() => {
          nameValueRef
          .current = (
            result
            .current
            .getValue(
              'name',
            )
          )
        })

        const emailValueRef: (
          ValueRef
        ) = {
          current: '',
        }

        act(() => {
          emailValueRef
          .current = (
            result
            .current
            .getValue(
              'email',
            )
          )
        })

        expect(
          emailValueRef
          .current
        )
        .toBe(
          emailValue
        )

        expect(
          nameValueRef
          .current
        )
        .toBe(
          nameValue
        )
      }
    )

    test(
      'overwrites all values when given new values',
      () => {
        const {
          rerender,
          result,
        } = (
          renderHook(
            useValuesState<
              string
            >
          )
        )

        act(() => {
          result
          .current
          .setValue(
            'name',
            'Jane of the Jungle',
          )
        })

        act(() => {
          result
          .current
          .setValue(
            'email',
            'john.smith@test.com',
          )
        })

        const nameValue = 'John Smith'

        rerender({
          values: {
            name: nameValue,
          },
        })

        const emailValueRef: (
          ValueRef
        ) = {
          current: '',
        }

        act(() => {
          emailValueRef
          .current = (
            result
            .current
            .getValue(
              'email',
            )
          )
        })

        const nameValueRef: (
          ValueRef
        ) = {
          current: '',
        }

        act(() => {
          nameValueRef
          .current = (
            result
            .current
            .getValue(
              'name',
            )
          )
        })

        expect(
          emailValueRef
          .current
        )
        .toBeUndefined()

        expect(
          nameValueRef
          .current
        )
        .toBe(
          nameValue
        )
      }
    )
  }
)
