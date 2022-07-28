import {
  act,
  renderHook,
} from '@testing-library/react'

import useValidationType, {
  validationTypes,
} from './useValidationType.js'

describe(
  'useValidationType',
  () => {
    test(
      'starts as `change` type by default',
      () => {
        const {
          result,
        } = (
          renderHook(
            useValidationType,
          )
        )

        expect(
          result
          .current
          .getValidationType()
        )
        .toBe(
          validationTypes
          .change
        )
      }
    )

    test(
      'sets to `submit` when calling the submit setter',
      () => {
        const {
          result,
        } = (
          renderHook(
            useValidationType,
          )
        )

        act(() => {
          result
          .current
          .setValidationTypeSubmit()
        })

        expect(
          result
          .current
          .getValidationType()
        )
        .toBe(
          validationTypes
          .submit
        )
      }
    )

    test(
      'sets to `change` when calling the change setter',
      () => {
        const {
          result,
        } = (
          renderHook(
            useValidationType,
          )
        )

        act(() => {
          result
          .current
          .setValidationTypeSubmit()
        })

        act(() => {
          result
          .current
          .setValidationTypeChange()
        })

        expect(
          result
          .current
          .getValidationType()
        )
        .toBe(
          validationTypes
          .change
        )
      }
    )
  }
)
