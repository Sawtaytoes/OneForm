import {
  act,
  renderHook,
} from '@testing-library/react-hooks'

import OneForm from './OneForm.jsx'
import useFieldValue from './useFieldValue.js'

describe(
  'useFieldValue',
  () => {
    test(
      'has an `undefined` value',
      () => {
        const {
          result,
        } = (
          renderHook(
            useFieldValue,
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
          .value
        )
        .toBeUndefined()
      }
    )

    test(
      'sets the value',
      () => {
        const {
          result,
        } = (
          renderHook(
            useFieldValue,
            {
              initialProps: {
                name: 'email',
              },
              wrapper: OneForm,
            },
          )
        )

        const value = 'john.smith@test.com'

        act(() => {
          result
          .current
          .setValue(
            value
          )
        })

        expect(
          result
          .current
          .value
        )
        .toBe(
          value
        )
      }
    )

    test(
      'gets the latest set value',
      () => {
        const {
          result,
        } = (
          renderHook(
            useFieldValue,
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
          .setValue(
            'jane.of.the.jungle@jungletech.com'
          )
        })

        const value = 'john.smith@test.com'

        act(() => {
          result
          .current
          .setValue(
            value
          )
        })

        expect(
          result
          .current
          .value
        )
        .toBe(
          value
        )
      }
    )

    test(
      'changes the value if `name` changes',
      () => {
        const name = 'email'

        const {
          rerender,
          result,
        } = (
          renderHook(
            useFieldValue,
            {
              initialProps: {
                name,
              },
              wrapper: OneForm,
            },
          )
        )

        const value = 'john.smith@test.com'

        act(() => {
          result
          .current
          .setValue(
            value
          )
        })

        const newName = 'name'

        act(() => {
          rerender({
            name: newName,
          })
        })

        expect(
          result
          .current
          .value
        )
        .toBeUndefined()

        const newValue = 'John Smith'

        act(() => {
          result
          .current
          .setValue(
            newValue
          )
        })

        expect(
          result
          .current
          .value
        )
        .toBe(
          newValue
        )

        act(() => {
          rerender({
            name,
          })
        })

        expect(
          result
          .current
          .value
        )
        .toBe(
          value
        )
      }
    )
  }
)
