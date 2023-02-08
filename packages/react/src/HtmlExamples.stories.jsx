/* eslint-disable react/prop-types */
import {
  action,
} from '@storybook/addon-actions'
import {
  useCallback,
  useState,
} from 'react'

import Field from './Field'
import { FieldErrorMessage } from './FieldErrorMessage'
import {
  FieldGroup,
} from './FieldGroup'
import FieldValue from './FieldValue'
import htmlStyleDecorators from '././htmlStyleDecorators'
import OneFormProvider from './OneFormProvider'
import SubmitField from './SubmitField'

export default {
  args: {
    onChange: action(),
    onSubmit: action(),
  },
  argTypes: {
    onChange: 'changed',
    onSubmit: 'submitted',
  },
  decorators: htmlStyleDecorators,
  title: 'Examples/HTML',
}

export const Registration = (
  args,
) => {
  const [
    submittedValues,
    setSubmittedValues,
  ] = (
    useState()
  )

  const formSubmitted = (
    useCallback(
      ({
        registeredValues,
      }) => {
        args
        .onSubmit(
          registeredValues
        )

        return (
          new Promise((
            resolve,
          ) => {
            setTimeout(
              resolve,
              1000,
            )
          })
          .then(() => {
            setSubmittedValues(
              registeredValues
            )
          })
        )
      },
      [
        args,
      ],
    )
  )

  return (
    <OneFormProvider
      {...args}
      onSubmit={formSubmitted}
    >
      <div>
        <label>
          <Field>
            <input
              name="username"
            />
          </Field>
        </label>

        <div>
          <FieldErrorMessage
            name="username"
          />
        </div>
      </div>

      <div>
        <label>
          <Field>
            <input
              name="password"
              type="password"
            />
          </Field>
        </label>

        <div>
          <FieldErrorMessage
            name="password"
          />
        </div>
      </div>

      <div>
        <label>
          <Field>
            <input
              name="rememberMe"
              type="checkbox"
            />
          </Field>

          remember me
        </label>
      </div>

      <div>
        <SubmitField>
          <button
            type="submit"
          >
            Submit
          </button>
        </SubmitField>
      </div>

      {
        submittedValues
        && (
          <pre>
            {
              JSON
              .stringify(
                submittedValues,
                null,
                2,
              )
            }
          </pre>
        )
      }
    </OneFormProvider>
  )
}

Registration
.args = {
  validations: {
    password: [
      {
        errorMessage: 'You must enter a password.',
        getIsValid: ({
          value,
        }) => (
          value
        ),
      },
    ],
    username: [
      {
        errorMessage: 'You must enter a username.',
        getIsValid: ({
          value,
        }) => (
          value
        ),
      },
      {
        errorMessage: 'Username must be longer than 6 characters.',
        getIsValid: ({
          value,
        }) => (
          (
            value
            ?.length
          )
          > 0
        ),
      },
    ],
  },
}

const products = [
  {
    id: 'af45',
    name: 'T-Shirt',
    price: 10,
  },
  {
    id: '3b82',
    name: 'Sweatshirt',
    price: 14,
  },
]

export const ProductSelection = (
  args,
) => {
  const [
    submittedValues,
    setSubmittedValues,
  ] = (
    useState()
  )

  const formSubmitted = (
    useCallback(
      ({
        registeredValues,
      }) => {
        args
        .onSubmit(
          registeredValues
        )

        return (
          new Promise((
            resolve,
          ) => {
            setTimeout(
              resolve,
              1000,
            )
          })
          .then(() => {
            setSubmittedValues(
              registeredValues
            )
          })
        )
      },
      [
        args,
      ],
    )
  )

  return (
    <OneFormProvider
      {...args}
      onSubmit={formSubmitted}
    >
      {
        products
        .map(({
          id,
          name,
          price,
        }) => (
          <div
            key={id}
            style={{
              border: '1px solid #666',
              borderRadius: '10px',
              display: 'inline-block',
              padding: '20px',
            }}
          >
            <FieldGroup
              id={id}
              name="productId"
            >
              <div>
                <label>
                  <Field>
                    <input
                      name="isSelected"
                      type="checkbox"
                    />
                  </Field>

                  {name}
                </label>
              </div>

              <div>
                ${price}.00
              </div>

              <div>
                <label>
                  Quantity:
                  {' '}

                  <Field>
                    <select name="quantity">
                      <option value="">
                        Quantity
                      </option>

                      <option value="1">
                        1
                      </option>

                      <option value="2">
                        2
                      </option>

                      <option value="3">
                        3
                      </option>
                    </select>
                  </Field>
                </label>

                <label>
                  Color:
                  {' '}

                  <Field>
                    <select name="color">
                      <option value="">
                        Color
                      </option>

                      <option value="green">
                        Green
                      </option>

                      <option value="red">
                        Red
                      </option>

                      <option value="blue">
                        Blue
                      </option>
                    </select>
                  </Field>
                </label>

                <label>
                  Size:
                  {' '}

                  <Field>
                    <select name="size">
                      <option value="">
                        Size
                      </option>

                      <option value="small">
                        Small
                      </option>

                      <option value="medium">
                        Medium
                      </option>

                      <option value="large">
                        Large
                      </option>
                    </select>
                  </Field>
                </label>

                <div>
                  <FieldErrorMessage
                    name="product.error"
                  />
                </div>
              </div>
            </FieldGroup>
          </div>
        ))
      }

      <div>
        $
        <FieldValue
          name="cart.totalPrice"
        />
        .00
      </div>

      <div>
        <FieldErrorMessage
          name="cart.error"
        />
      </div>

      <div>
        <SubmitField>
          <button
            type="submit"
          >
            Add to Cart
          </button>
        </SubmitField>
      </div>

      {
        submittedValues
        && (
          <pre>
            {
              JSON
              .stringify(
                submittedValues,
                null,
                2,
              )
            }
          </pre>
        )
      }
    </OneFormProvider>
  )
}

ProductSelection
.args = {
  groupValidations: [
    {
      fieldNames: [
        'isSelected',
      ],
      getErrorMessages: ({
        validationType,
        values,
      }) => ({
        'cart.error': (
          (
            validationType
            === 'submit'
          )
          && (
            !(
              values
              .isSelected
              .some(({
                value,
              }) => (
                value
              ))
            )
          )
          && (
            'You need to select at least one product.'
          )
        ),
      }),
    },
    {
      fieldNames: [
        'color',
        'isSelected',
        'quantity',
        'size',
      ],
      getErrorMessages: ({
        reverseLookup,
        validationType,
        values,
      }) => ({
        [
          'product.error'
          // TEMP: This code is only here until groupIds are added to `getErrorMessages`.
          .concat(
            reverseLookup
            .isSelected
            .replace(
              /.+(\/productId:.+)/,
              '$1',
            )
          )
        ]: (
          (
            validationType
            === 'submit'
          )
          && (
            values
            .isSelected
          )
          && (
            !(
              values
              .color
            )
            || !(
              values
              .quantity
            )
            || !(
              values
              .size
            )
          )
          && (
            'You must select all.'
          )
        ),
      }),
      groupNames: [
        'productId',
      ],
    },
  ],
  onChange: ({
    fieldName,
    values,
  }) => {
    if (
      fieldName
      .startsWith(
        'isSelected'
      )
      || (
        fieldName
        .startsWith(
          'quantity'
        )
      )
    ) {
      return {
        'cart.totalPrice': (
          Object
          .entries(
            values
          )
          .map(([
            identifier,
            value,
          ]) => ({
            identifier,
            value,
          }))
          .filter(({
            identifier,
            value,
          }) => (
            (
              identifier
              .startsWith(
                'isSelected'
              )
            )
            && (
              value
            )
          ))
          .reduce(
            (
              totalPrice,
              {
                identifier,
              },
            ) => {
              const {
                id,
                price,
              } = (
                products
                .find(({
                  id,
                }) => (
                  id
                  === (
                    identifier
                    .replace(
                      /.+\/productId:(.+)/,
                      '$1',
                    )
                  )
                ))
              )

              return (
                totalPrice
                + (
                  price
                  * (
                    Number(
                      values
                      [`quantity/productId:${id}`]
                    )
                    || 0
                  )
                )
              )
            },
            0,
          )
        ),
      }
    }
  },
  updatedValues: {
    'cart.totalPrice': 0,
  },
}
