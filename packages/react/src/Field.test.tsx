import {
  render,
  screen,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import {
  Field,
} from './Field'
import {
  OneFormProvider ,
} from './OneFormProvider '

describe(
  'Field',
  () => {
    test(
      'keeps the props that were passed',
      () => {
        const props = {
          id: 'email',
          name: 'email',
          placeholder: 'Email',
        }

        render(
          <OneFormProvider>
            <Field>
              <input
                {...props}
              />
            </Field>
          </OneFormProvider>
        )

        const domElement = (
          screen
          .getByRole(
            'textbox'
          ) as (
            HTMLInputElement
          )
        )

        expect({
          id: (
            domElement
            .id
          ),
          name: (
            domElement
            .name
          ),
          placeholder: (
            domElement
            .placeholder
          ),
        })
        .toStrictEqual(
          props
        )
      },
    )

    test(
      'contains the given value when changed',
      async () => {
        render(
          <OneFormProvider>
            <Field>
              <input
                name="email"
              />
            </Field>
          </OneFormProvider>
        )

        const domElement = (
          screen
          .getByRole(
            'textbox'
          ) as (
            HTMLInputElement
          )
        )

        const value = 'a'

        const user = (
          userEvent
          .setup()
        )

        await (
          user
          .type(
            domElement,
            value,
          )
        )

        expect(
          domElement
          .value
        )
        .toBe(
          value
        )
      },
    )

    test(
      'contains the last given value',
      async () => {
        render(
          <OneFormProvider>
            <Field>
              <input
                name="email"
              />
            </Field>
          </OneFormProvider>
        )

        const domElement = (
          screen
          .getByRole(
            'textbox'
          ) as (
            HTMLInputElement
          )
        )

        const user = (
          userEvent
          .setup()
        )

        await (
          user
          .type(
            domElement,
            'a',
          )
        )

        await (
          user
          .type(
            domElement,
            'b',
          )
        )

        expect(
          domElement
          .value
        )
        .toBe(
          'ab'
        )
      },
    )

    test(
      'calls the given function on change',
      async () => {
        const valueChanged = (
          jest
          .fn()
        )

        render(
          <OneFormProvider>
            <Field>
              <input
                name="email"
                onChange={valueChanged}
              />
            </Field>
          </OneFormProvider>
        )

        const domElement = (
          screen
          .getByRole(
            'textbox'
          ) as (
            HTMLInputElement
          )
        )

        const user = (
          userEvent
          .setup()
        )

        await (
          user
          .type(
            domElement,
            'a',
          )
        )

        await (
          user
          .type(
            domElement,
            'b',
          )
        )

        expect(
          valueChanged
        )
        .toHaveBeenCalledTimes(
          2
        )
      },
    )

    test(
      'sets the exact value from `onChange` if it is a non-object value.',
      async () => {
        const NonStandardInput = ({
          name,
          onChange,
          value,
        }: {
          name: string,
          onChange?: (
            value: string
          ) => (
            void
          ),
          value?: string,
        }) => (
          <input
            name={name}
            onChange={(
              event,
            ) => (
              onChange?.(
                event
                .currentTarget
                .value
              )
            )}
            value={value}
          />
        )

        render(
          <OneFormProvider>
            <Field>
              <NonStandardInput
                name="email"
              />
            </Field>
          </OneFormProvider>
        )

        const domElement = (
          screen
          .getByRole(
            'textbox'
          ) as (
            HTMLInputElement
          )
        )

        const user = (
          userEvent
          .setup()
        )

        await (
          user
          .type(
            domElement,
            'a',
          )
        )

        await (
          user
          .type(
            domElement,
            'b',
          )
        )

        expect(
          domElement
          .value
        )
        .toBe(
          'ab'
        )
      },
    )

    test(
      'sets the exact value from `onChange` if passes an object.',
      async () => {
        const NonStandardInput = ({
          name,
          onChange,
          value,
        }: {
          name: string,
          onChange?: ({
            data,
          }: {
            data: string,
          }) => (
            void
          ),
          value?: string,
        }) => (
          <input
            name={name}
            onChange={(
              event,
            ) => (
              onChange?.({
                data: (
                  event
                  .target
                  .value
                )
              })
            )}
            value={value}
          />
        )

        render(
          <OneFormProvider>
            <Field>
              <NonStandardInput
                name="email"
              />
            </Field>
          </OneFormProvider>
        )

        const domElement = (
          screen
          .getByRole(
            'textbox'
          ) as (
            HTMLInputElement
          )
        )

        const user = (
          userEvent
          .setup()
        )

        await (
          user
          .type(
            domElement,
            'a',
          )
        )

        await (
          user
          .type(
            domElement,
            'b',
          )
        )

        expect(
          domElement
          .value
        )
        .toBe(
          '[object Object]'
        )
      },
    )

    test(
      'sets the exact value from `onChange` if passes an invalid event object.',
      async () => {
        const NonStandardInput = ({
          name,
          onChange,
          value,
        }: {
          name: string,
          onChange?: (
            event: {
              currentTarget: {
                value: string
              },
            },
          ) => (
            void
          ),
          value?: string,
        }) => (
          <input
            name={name}
            onChange={(
              event,
            ) => (
              onChange?.({
                currentTarget: {
                  value: (
                    event
                    .currentTarget
                    .value
                  ),
                },
              })
            )}
            value={value}
          />
        )

        render(
          <OneFormProvider>
            <Field>
              <NonStandardInput
                name="email"
              />
            </Field>
          </OneFormProvider>
        )

        const domElement = (
          screen
          .getByRole(
            'textbox'
          ) as (
            HTMLInputElement
          )
        )

        const user = (
          userEvent
          .setup()
        )

        await (
          user
          .type(
            domElement,
            'a',
          )
        )

        await (
          user
          .type(
            domElement,
            'b',
          )
        )

        expect(
          domElement
          .value
        )
        .toBe(
          'ab'
        )
      },
    )
  }
)
