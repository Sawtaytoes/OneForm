/* eslint-disable react/prop-types */
import {
  render,
  screen,
} from '@testing-library/react'
// TEMPORARY. This is fixed in v4
// import userEvent from '@testing-library/user-event'

import OneFormProvider from './OneFormProvider.jsx'
import Field from './Field.jsx'

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

    // test(
    //   'contains the given value when changed',
    //   () => {
    //     render(
    //       <OneFormProvider>
    //         <Field>
    //           <input
    //             name="email"
    //           />
    //         </Field>
    //       </OneFormProvider>
    //     )

    //     const domElement = (
    //       screen
    //       .getByRole(
    //         'textbox'
    //       )
    //     )

    //     const value = 'a'

    //     userEvent
    //     .type(
    //       domElement,
    //       value,
    //     )

    //     expect(
    //       domElement
    //       .value
    //     )
    //     .toBe(
    //       value
    //     )
    //   },
    // )

    // test(
    //   'contains the last given value',
    //   () => {
    //     render(
    //       <OneFormProvider>
    //         <Field>
    //           <input
    //             name="email"
    //           />
    //         </Field>
    //       </OneFormProvider>
    //     )

    //     const domElement = (
    //       screen
    //       .getByRole(
    //         'textbox'
    //       )
    //     )

    //     userEvent
    //     .type(
    //       domElement,
    //       'a',
    //     )

    //     userEvent
    //     .type(
    //       domElement,
    //       'b',
    //     )

    //     expect(
    //       domElement
    //       .value
    //     )
    //     .toBe(
    //       'ab'
    //     )
    //   },
    // )

    // test(
    //   'calls the given function on change',
    //   () => {
    //     const valueChanged = (
    //       jest
    //       .fn()
    //     )

    //     render(
    //       <OneFormProvider>
    //         <Field>
    //           <input
    //             name="email"
    //             onChange={valueChanged}
    //           />
    //         </Field>
    //       </OneFormProvider>
    //     )

    //     const domElement = (
    //       screen
    //       .getByRole(
    //         'textbox'
    //       )
    //     )

    //     userEvent
    //     .type(
    //       domElement,
    //       'a',
    //     )

    //     userEvent
    //     .type(
    //       domElement,
    //       'b',
    //     )

    //     expect(
    //       valueChanged
    //     )
    //     .toHaveBeenCalledTimes(
    //       2
    //     )
    //   },
    // )

    // test(
    //   'sets the exact value from `onChange` if it is a non-object value.',
    //   () => {
    //     const NonStandardInput = ({
    //       name,
    //       onChange,
    //       value,
    //     }) => (
    //       <input
    //         name={name}
    //         onChange={(
    //           event,
    //         ) => (
    //           onChange(
    //             event
    //             .target
    //             .value
    //           )
    //         )}
    //         value={value}
    //       />
    //     )

    //     render(
    //       <OneFormProvider>
    //         <Field>
    //           <NonStandardInput
    //             name="email"
    //           />
    //         </Field>
    //       </OneFormProvider>
    //     )

    //     const domElement = (
    //       screen
    //       .getByRole(
    //         'textbox'
    //       )
    //     )

    //     userEvent
    //     .type(
    //       domElement,
    //       'a',
    //     )

    //     userEvent
    //     .type(
    //       domElement,
    //       'b',
    //     )

    //     expect(
    //       domElement
    //       .value
    //     )
    //     .toBe(
    //       'ab'
    //     )
    //   },
    // )

    // test(
    //   'sets the exact value from `onChange` if passes an object.',
    //   () => {
    //     const NonStandardInput = ({
    //       name,
    //       onChange,
    //       value,
    //     }) => (
    //       <input
    //         name={name}
    //         onChange={(
    //           event,
    //         ) => (
    //           onChange({
    //             data: (
    //               event
    //               .target
    //               .value
    //             )
    //           })
    //         )}
    //         value={value}
    //       />
    //     )

    //     render(
    //       <OneFormProvider>
    //         <Field>
    //           <NonStandardInput
    //             name="email"
    //           />
    //         </Field>
    //       </OneFormProvider>
    //     )

    //     const domElement = (
    //       screen
    //       .getByRole(
    //         'textbox'
    //       )
    //     )

    //     userEvent
    //     .type(
    //       domElement,
    //       'a',
    //     )

    //     userEvent
    //     .type(
    //       domElement,
    //       'b',
    //     )

    //     expect(
    //       domElement
    //       .value
    //     )
    //     .toBe(
    //       '[object Object]'
    //     )
    //   },
    // )

    // test(
    //   'sets the exact value from `onChange` if passes an invalid event object.',
    //   () => {
    //     const NonStandardInput = ({
    //       name,
    //       onChange,
    //       value,
    //     }) => (
    //       <input
    //         name={name}
    //         onChange={(
    //           event,
    //         ) => (
    //           onChange({
    //             target: {
    //               value: (
    //                 event
    //                 .target
    //                 .value
    //               ),
    //             },
    //           })
    //         )}
    //         value={value}
    //       />
    //     )

    //     render(
    //       <OneFormProvider>
    //         <Field>
    //           <NonStandardInput
    //             name="email"
    //           />
    //         </Field>
    //       </OneFormProvider>
    //     )

    //     const domElement = (
    //       screen
    //       .getByRole(
    //         'textbox'
    //       )
    //     )

    //     userEvent
    //     .type(
    //       domElement,
    //       'a',
    //     )

    //     userEvent
    //     .type(
    //       domElement,
    //       'b',
    //     )

    //     expect(
    //       domElement
    //       .value
    //     )
    //     .toBe(
    //       'ab'
    //     )
    //   },
    // )
  }
)
