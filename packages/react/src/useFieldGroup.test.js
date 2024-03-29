/* eslint-disable react/prop-types */
import {
  renderHook,
} from '@testing-library/react-hooks'

import FieldGroup from './FieldGroup.jsx'
import OneFormProvider from './OneFormProvider.jsx'
import useFieldGroup from './useFieldGroup.js'

describe(
  'useFieldGroup',
  () => {
    test(
      'adds field group to initial parent',
      () => {
        const fieldGroupProps = {
          id: '1',
          name: 'addressId',
        }

        const {
          result,
        } = (
          renderHook(
            useFieldGroup,
            {
              initialProps: (
                fieldGroupProps
              ),
              wrapper: (
                OneFormProvider
              ),
            },
          )
        )

        expect(
          result
          .current
          .fieldGroups
        )
        .toEqual([
          fieldGroupProps,
        ])
      }
    )

    test(
      'adds field group to field group parent',
      () => {
        const fieldGroup1Props = {
          id: '1',
          name: 'addressId',
        }

        const Wrapper = ({
          children,
        }) => (
          <OneFormProvider>
            <FieldGroup
              {...fieldGroup1Props}
            >
              {children}
            </FieldGroup>
          </OneFormProvider>
        )

        const fieldGroup2Props = {
          id: '1',
          name: 'emailId',
        }

        const {
          result,
        } = (
          renderHook(
            useFieldGroup,
            {
              initialProps: (
                fieldGroup2Props
              ),
              wrapper: (
                Wrapper
              ),
            },
          )
        )

        expect(
          result
          .current
          .fieldGroups
        )
        .toEqual([
          fieldGroup1Props,
          fieldGroup2Props,
        ])
      }
    )

    test(
      'updates field group when ids change',
      () => {
        const fieldGroup1Props = {
          id: '1',
          name: 'addressId',
        }

        const Wrapper = ({
          children,
        }) => (
          <OneFormProvider>
            <FieldGroup
              {...fieldGroup1Props}
            >
              {children}
            </FieldGroup>
          </OneFormProvider>
        )

        const {
          rerender,
          result,
        } = (
          renderHook(
            useFieldGroup,
            {
              initialProps: {
                id: '1',
                name: 'emailId',
              },
              wrapper: (
                Wrapper
              ),
            },
          )
        )

        const fieldGroup2Props = {
          id: '2',
          name: 'phoneId',
        }

        rerender(
          fieldGroup2Props
        )

        expect(
          result
          .current
          .fieldGroups
        )
        .toEqual([
          fieldGroup1Props,
          fieldGroup2Props,
        ])
      }
    )
  }
)
