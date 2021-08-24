/* eslint-disable react/prop-types */
import {
  act,
  renderHook,
} from '@testing-library/react-hooks'

import FieldGroup from './FieldGroup.jsx'
import OneForm from './OneForm.jsx'
import useFieldName, {
  errorMessages,
} from './useFieldName.js'

describe(
  'useFieldName',
  () => {
    test(
      'returns the given field name',
      () => {
        const fieldName = 'email'

        const {
          result,
        } = (
          renderHook(
            useFieldName,
            {
              initialProps: {
                name: fieldName,
              },
              wrapper: OneForm,
            },
          )
        )

        expect(
          result
          .current
          .fieldName
        )
        .toBe(
          fieldName
        )
      }
    )

    test(
      'combines a field group name',
      () => {
        const fieldGroupProps = {
          id: 'e52d',
          name: 'addressId',
        }

        const Wrapper = ({
          children,
        }) => (
          <OneForm>
            <FieldGroup
              {...fieldGroupProps}
            >
              {children}
            </FieldGroup>
          </OneForm>
        )

        const fieldName = 'zipCode'

        const {
          result,
        } = (
          renderHook(
            useFieldName,
            {
              initialProps: {
                name: fieldName,
              },
              wrapper: Wrapper,
            },
          )
        )

        expect(
          result
          .current
          .fieldName
        )
        .toBe(
          fieldName
          .concat(
            '/',
            (
              fieldGroupProps
              .name
            ),
            ':',
            (
              fieldGroupProps
              .id
            ),
          )
        )
      }
    )

    test(
      'combines multiple field group names',
      () => {
        const fieldGroup1Props = {
          id: 'e52d',
          name: 'addressId',
        }

        const fieldGroup2Props = {
          id: '452f',
          name: 'userId',
        }

        const Wrapper = ({
          children,
        }) => (
          <OneForm>
            <FieldGroup
              {...fieldGroup1Props}
            >
              <FieldGroup
                {...fieldGroup2Props}
              >
                {children}
              </FieldGroup>
            </FieldGroup>
          </OneForm>
        )

        const fieldName = 'zipCode'

        const {
          result,
        } = (
          renderHook(
            useFieldName,
            {
              initialProps: {
                name: fieldName,
              },
              wrapper: Wrapper,
            },
          )
        )

        expect(
          result
          .current
          .fieldName
        )
        .toBe(
          fieldName
          .concat(
            '/',
            (
              fieldGroup1Props
              .name
            ),
            ':',
            (
              fieldGroup1Props
              .id
            ),
            '/',
            (
              fieldGroup2Props
              .name
            ),
            ':',
            (
              fieldGroup2Props
              .id
            ),
          )
        )
      }
    )

    test(
      'throws an error if the field name is not a string',
      () => {
        const {
          result,
        } = (
          renderHook(
            useFieldName,
            {
              initialProps: {
                name: 0,
              },
              wrapper: OneForm,
            },
          )
        )

        act(() => {
          expect(
            result
            .error
          )
          .toEqual(
            new Error(
              errorMessages
              .nonStringName
            )
          )
        })
      }
    )

    test(
      'throws an error if the props object was accidentally a field name string',
      () => {
        const {
          result,
        } = (
          renderHook(
            useFieldName,
            {
              initialProps: 'email',
              wrapper: OneForm,
            },
          )
        )

        act(() => {
          expect(
            result
            .error
          )
          .toEqual(
            new Error(
              errorMessages
              .undefinedName
            )
          )
        })
      }
    )

    test(
      'throws an error if the field name is undefined',
      () => {
        const {
          result,
        } = (
          renderHook(
            useFieldName,
            {
              wrapper: OneForm,
            },
          )
        )

        act(() => {
          expect(
            result
            .error
          )
          .toBeInstanceOf(
            TypeError
          )
        })
      }
    )
  }
)
