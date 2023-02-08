import {
  renderHook,
} from '@testing-library/react'
import {
  ReactElement,
} from 'react'

import {
  FieldGroup,
} from './FieldGroup'
import {
  OneFormProvider ,
} from './OneFormProvider '
import {
  useFieldName,
} from './useFieldName'

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
              wrapper: OneFormProvider,
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
        }: {
          children: ReactElement,
        }) => (
          <OneFormProvider>
            <FieldGroup
              {...fieldGroupProps}
            >
              {children}
            </FieldGroup>
          </OneFormProvider>
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
        }: {
          children: ReactElement,
        }) => (
          <OneFormProvider>
            <FieldGroup
              {...fieldGroup1Props}
            >
              <FieldGroup
                {...fieldGroup2Props}
              >
                {children}
              </FieldGroup>
            </FieldGroup>
          </OneFormProvider>
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
  }
)
