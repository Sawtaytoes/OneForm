/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  action,
} from '@storybook/addon-actions'
import {
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react'

import Field from './Field.jsx'
import FieldErrorMessage from './FieldErrorMessage.jsx'
import FieldGroup from './FieldGroup.jsx'
import FieldValue from './FieldValue.jsx'
import htmlStyleDecorators from './htmlStyleDecorators.jsx'
import OneForm from './OneForm.jsx'
import SubmitField from './SubmitField.jsx'
import useFieldValue from './useFieldValue.js'

export default {
  args: {
    onChange: action(),
    onSubmit: action(),
  },
  argTypes: {
    onChange: 'changed',
    onSubmit: 'submitted',
  },
  component: OneForm,
  decorators: htmlStyleDecorators,
  title: 'Forms/OneForm',
}

export const DisplayTextValue = (
  args,
) => (
  <OneForm {...args}>
    <div>
      <Field>
        <input name="message" />
      </Field>
    </div>

    <div>
      <FieldValue name="message" />
    </div>
  </OneForm>
)

export const InitialTextValues = (
  args,
) => (
  <OneForm {...args}>
    <div>
      <Field>
        <input name="message" />
      </Field>
    </div>

    <div>
      <FieldValue name="message" />
    </div>
  </OneForm>
)

InitialTextValues
.args = {
  values: {
    message: 'Hello World!',
  },
}

export const CheckboxWithValue = (
  args,
) => (
  <OneForm {...args}>
    <label>
      <Field>
        <input
          name="checkbox"
          type="checkbox"
          value="The Checkbox Value"
        />
      </Field>

      Checkbox with Value
    </label>

    <div>
      <FieldValue name="checkbox" />
    </div>
  </OneForm>
)

CheckboxWithValue
.args = {
  values: {
    checkbox: '',
  },
}

export const InitialCheckboxValues = (
  args,
) => (
  <OneForm {...args}>
    <label>
      <Field>
        <input
          name="checkboxWithoutValue"
          type="checkbox"
        />
      </Field>

      Checkbox without Value
    </label>

    <label>
      <Field>
        <input
          name="checkboxWithValue"
          type="checkbox"
          value="The Checkbox Value"
        />
      </Field>

      Checkbox with Value
    </label>
  </OneForm>
)

InitialCheckboxValues
.args = {
  values: {
    checkboxWithoutValue: true,
    checkboxWithValue: 'The Checkbox Value',
  },
}

export const InitialRadioValues = (
  args,
) => (
  <OneForm {...args}>
    <label>
      <Field>
        <input
          name="item"
          type="radio"
          value="first"
        />
      </Field>

      First
    </label>

    <label>
      <Field>
        <input
          name="item"
          type="radio"
          value="second"
        />
      </Field>

      Second
    </label>

    <div>
      Selected Item: <FieldValue name="item" />
    </div>
  </OneForm>
)

InitialRadioValues
.args = {
  values: {
    item: 'second',
  },
}

export const SelectValue = (
  args,
) => (
  <OneForm {...args}>
    <Field>
      <select name="color">
        <option value="">
          Select a color.
        </option>

        <option value="red">
          Red
        </option>

        <option value="yellow">
          Yellow
        </option>

        <option value="green">
          Green
        </option>

        <option value="blue">
          Blue
        </option>
      </select>
    </Field>

    <div>
      Selected Color: <FieldValue name="color" />
    </div>
  </OneForm>
)

export const SelectOptionGroupValue = (
  args,
) => (
  <OneForm {...args}>
    <Field>
      <select name="color">
        <option value="">
          Select a color.
        </option>

        <optgroup label="Warm">
          <option value="red">
            Red
          </option>

          <option value="yellow">
            Yellow
          </option>
        </optgroup>

        <optgroup label="Cool">
          <option value="green">
            Green
          </option>

          <option value="blue">
            Blue
          </option>
        </optgroup>
      </select>
    </Field>

    <div>
      Selected Color: <FieldValue name="color" />
    </div>
  </OneForm>
)

export const InitialSelectValue = (
  args,
) => (
  <OneForm {...args}>
    <label htmlFor="color">
      Select a color.
    </label>

    <Field>
      <select
        id="color"
        name="color"
      >
        <option value="red">
          Red
        </option>

        <option value="yellow">
          Yellow
        </option>

        <option value="green">
          Green
        </option>

        <option value="blue">
          Blue
        </option>
      </select>
    </Field>

    <div>
      Selected Color: <FieldValue name="color" />
    </div>
  </OneForm>
)

InitialSelectValue
.args = {
  values: {
    color: [
      'yellow',
    ],
  },
}

export const InitialMultiSelect = (
  args,
) => (
  <OneForm {...args}>
    <label htmlFor="color">
      Select zero to many colors.
    </label>

    <Field>
      <select
        id="color"
        multiple
        name="color"
        size="4"
      >
        <option
          hidden
          value=""
        />

        <option value="red">
          Red
        </option>

        <option value="yellow">
          Yellow
        </option>

        <option value="green">
          Green
        </option>

        <option value="blue">
          Blue
        </option>
      </select>
    </Field>

    <div>
      Selected Colors: <FieldValue name="color" />
    </div>
  </OneForm>
)

InitialMultiSelect
.args = {
  values: {
    color: [
      'yellow',
      'green',
    ],
  },
}

export const Submit = (
  args,
) => (
  <OneForm {...args}>
    <div>
      <Field>
        <input name="message" />
      </Field>
    </div>

    <div>
      <SubmitField>
        <button type="submit">
          Submit
        </button>
      </SubmitField>
    </div>
  </OneForm>
)

export const ValueStateChange = (
  args,
) => (
  <OneForm {...args}>
    <div>
      <Field>
        <input
          name="message1"
          placeholder="Message 1"
        />
      </Field>
    </div>

    <div>
      <Field>
        <input
          name="message2"
          placeholder="Message 2"
        />
      </Field>
    </div>
  </OneForm>
)

ValueStateChange
.args = {
  onChange: ({
    fieldName,
    value,
  }) => {
    if (fieldName === 'message1') {
      return {
        message2: value,
      }
    }
  },
}

export const CyclicValueStateChange = (
  args,
) => (
  <OneForm {...args}>
    <div>
      <Field>
        <input
          name="message1"
          placeholder="Message 1"
        />
      </Field>
    </div>

    <div>
      <Field>
        <input
          name="message2"
          placeholder="Message 2"
        />
      </Field>
    </div>
  </OneForm>
)

CyclicValueStateChange
.args = {
  onChange: ({
    value,
  }) => ({
    message1: value,
    message2: value,
  }),
}

export const UpdatingOnChange = () => {
  const [
    count,
    setCount,
  ] = useState(0)

  const onChange = (
    useCallback(
      ({
        value,
      }) => ({
        copiedMessage: value,
        count,
      }),
      [
        count,
      ],
    )
  )

  const updateOnChange = (
    useCallback(
      () => {
        setCount((
          count,
        ) => (
          count
          + 1
        ))
      },
      [],
    )
  )

  return (
    <OneForm onChange={onChange}>
      <div>
        <Field>
          <input
            name="message"
            placeholder="Message"
          />
        </Field>
      </div>

      <div>
        <FieldValue name="copiedMessage" />
      </div>

      <div>
        <FieldValue name="count" />
      </div>

      <button onClick={updateOnChange}>
        Update
        {' '}
        <code>
          onChange
        </code>
      </button>
    </OneForm>
  )
}

export const Validation = (
  args,
) => (
  <OneForm {...args}>
    <div>
      <Field>
        <input
          id="message1"
          name="message1"
          placeholder="Message 1"
        />
      </Field>
    </div>

    <div>
      <FieldErrorMessage name="message1" />
    </div>

    <div>
      <Field>
        <input
          id="message2"
          name="message2"
          placeholder="Message 2"
        />
      </Field>
    </div>

    <div>
      <FieldErrorMessage name="message2" />
    </div>

    <div>
      <SubmitField>
        <button type="submit">
          Submit
        </button>
      </SubmitField>
    </div>
  </OneForm>
)

Validation
.args = {
  validations: {
    message1: [
      {
        errorMessage: (
          'No lowercase letters.'
        ),
        getIsValid: ({
          value,
        }) => (
          value
          && (
            value
            === (
              value
              .toUpperCase()
            )
          )
        ),
      },
    ],
    message2: [
      {
        errorMessage: (
          'No uppercase letters.'
        ),
        getIsValid: ({
          value,
        }) => (
          value
          && (
            value
            === (
              value
              .toLowerCase()
            )
          )
        ),
      },
    ],
  },
}

export const GroupValidation = (
  args,
) => (
  <OneForm {...args}>
    <div>
      <Field>
        <input
          name="message1"
          placeholder="Message 1"
        />
      </Field>
    </div>

    <div>
      <Field>
        <input
          name="message2"
          placeholder="Message 2"
        />
      </Field>
    </div>

    <div>
      <FieldErrorMessage name="message.error" />
    </div>

    <div>
      <SubmitField>
        <button type="submit">
          Submit
        </button>
      </SubmitField>
    </div>
  </OneForm>
)

GroupValidation
.args = {
  groupValidations: [
    {
      fieldNames: [
        'message1',
        'message2',
      ],
      getErrorMessages: ({
        values,
      }) => (
        (
          (
            values
            .message1
          )
          !== (
            values
            .message2
          )
        )
        ? {
          'message.error': (
            'Messages need to be identical.'
          ),
          'message1': (
            true
          ),
          'message2': (
            true
          ),
        }
        : {}
      ),
    },
  ],
}

export const FieldGroupValidation = (
  args,
) => (
  <OneForm {...args}>
    <div>
      <Field>
        <input
          name="message"
          placeholder="Message"
        />
      </Field>
    </div>

    <FieldGroup
      id="7b23"
      name="prohibitedWordId"
    >
      <div>
        <Field>
          <input
            name="prohibitedWord"
            placeholder="Prohibited Word 1"
          />
        </Field>
      </div>

      <div>
        <FieldErrorMessage name="group.error" />
      </div>
    </FieldGroup>

    <FieldGroup
      id="a452"
      name="prohibitedWordId"
    >
      <div>
        <Field>
          <input
            name="prohibitedWord"
            placeholder="Prohibited Word 2"
          />
        </Field>
      </div>

      <div>
        <FieldErrorMessage name="group.error" />
      </div>
    </FieldGroup>

    <div>
      <SubmitField>
        <button type="submit">
          Submit
        </button>
      </SubmitField>
    </div>
  </OneForm>
)

FieldGroupValidation
.args = {
  groupValidations: [
    {
      fieldNames: [
        'prohibitedWord',
        'message',
      ],
      getErrorMessages: ({
        groups,
        values,
      }) => ({
        [
          'group.error'
          .concat(
            groups
            .prohibitedWordId
            .groupString
          )
        ]: (
          values
          .message
          .includes(
            values
            .prohibitedWord
          )
          && (
            'You cannot have prohibited words in your message.'
          )
        ),
      }),
      groupNames: [
        'prohibitedWordId',
      ],
    },
  ],
  updatedValues: {
    'message': 'Time is fun and amazing.',
    'prohibitedWord/prohibitedWordId:7b23': 'amazing',
    'prohibitedWord/prohibitedWordId:a452': 'fun',
  },
}

export const Spreadsheet = () => {
  const numberOfColumns = 3

  const cells = (
    useMemo(
      () => (
        Array(
          numberOfColumns
          * 3
        )
        .fill()
        .map((
          value,
          index,
        ) => ({
          positionX: (
            String
            .fromCharCode(
              65 + (index % numberOfColumns)
            )
          ),
          positionY: (
            Math
            .ceil(
              (index + 1) / numberOfColumns
            )
          ),
        }))
        .map(({
          positionX,
          positionY,
        }) => (
          `${positionX}${positionY}`
        ))
      ),
      [],
    )
  )

  const getRangeCalculationBoundaries = (
    useCallback(
      (
        calculation,
      ) => (
        (/^=\w+\(([a-zA-Z])(\d+):([a-zA-Z])(\d+)\)$/)
        .exec(
          calculation
        )
        .slice(1)
      ),
      [],
    )
  )

  const getRangeCalculationNumbers = (
    useCallback(
      ({
        calculation,
        values,
      }) => {
        const [
          lowerColumnBound,
          lowerRowBound,
          upperColumnBound,
          upperRowBound,
        ] = (
          getRangeCalculationBoundaries(
            calculation
          )
        )

        const rangeCalculationNumbers = (
          Object
          .entries(
            values
          )
          .map(([
            cellName,
            cellValue,
          ]) => ({
            cellName,
            cellValue,
          }))
          .filter(({
            cellName,
          }) => (
            !(
              cellName
              .startsWith('calculation')
            )
          ))
          .filter(({
            cellName,
          }) => {
            const [
              cellColumn,
              cellRow,
            ] = cellName

            return (
              cellColumn >= lowerColumnBound
              && cellColumn <= upperColumnBound
              && cellRow >= lowerRowBound
              && cellRow <= upperRowBound
            )
          })
          .map(({
            cellValue,
          }) => (
            Number(
              cellValue
            )
          ))
        )

        return rangeCalculationNumbers
      },
      [
        getRangeCalculationBoundaries,
      ],
    )
  )

  const getAverage = (
    useCallback(
      ({
        calculation,
        values,
      }) => {
        const rangeCalculationNumbers = (
          getRangeCalculationNumbers({
            calculation,
            values,
          })
        )

        const summedNumbers = (
          rangeCalculationNumbers
          .reduce(
            (
              summation,
              number,
            ) => (
              summation + number
            ),
            0,
          )
        )

        const numberOfSummedNumbers = (
          rangeCalculationNumbers
          .length
        )

        return (
          String(
            summedNumbers / numberOfSummedNumbers
          )
        )
      },
      [
        getRangeCalculationNumbers,
      ],
    )
  )

  const getSummation = (
    useCallback(
      ({
        calculation,
        values,
      }) => {
        const rangeCalculationNumbers = (
          getRangeCalculationNumbers({
            calculation,
            values,
          })
        )

        return (
          String(
            rangeCalculationNumbers
            .reduce(
              (
                summation,
                number,
              ) => (
                summation + number
              ),
              0,
            )
          )
        )
      },
      [
        getRangeCalculationNumbers,
      ],
    )
  )

  const calculations = (
    useMemo(
      () => ({
        AVG: getAverage,
        SUM: getSummation,
      }),
      [
        getAverage,
        getSummation,
      ],
    )
  )

  const rangeCalculationsRegExp = (
    useMemo(
      () => {
        const calculationNamesRegExp = (
          Object
          .keys(
            calculations
          )
          .join('|')
        )

        return (
          new RegExp(
            `^=(${calculationNamesRegExp})\\([a-zA-Z]\\d+:[a-zA-Z]\\d+\\)$`
          )
        )
      },
      [
        calculations,
      ],
    )
  )

  const getIsRangeCalculation = (
    useCallback(
      (
        value,
      ) => (
        rangeCalculationsRegExp
        .test(value)
      ),
      [
        rangeCalculationsRegExp,
      ],
    )
  )

  const calculateRangeValue = (
    useCallback(
      ({
        calculation,
        values,
      }) => {
        const [
          calculationName,
        ] = (
          rangeCalculationsRegExp
          .exec(calculation)
          .slice(1)
        )

        return (
          calculations
          [calculationName]({
            calculation,
            values,
          })
        )
      },
      [
        calculations,
        rangeCalculationsRegExp,
      ],
    )
  )

  const Cell = (
    useCallback(
      ({
        id,
      }) => {
        const cellRef = useRef()

        const {
          value: cellValue,
        } = (
          useFieldValue({
            name: id,
          })
        )

        const {
          value: calculation,
        } = (
          useFieldValue({
            name: `calculation.${id}`,
          })
        )

        const [
          isFocused,
          setIsFocused,
        ] = (
          useState(
            false
          )
        )

        const onBlur = (
          useCallback(
            () => {
              setIsFocused(
                false
              )
            },
            [],
          )
        )

        const onFocus = (
          useCallback(
            () => {
              setIsFocused(
                true
              )
            },
            [],
          )
        )

        const onChange = (
          useCallback(
            ({
              target,
            }) => {
              const {
                selectionDirection,
                selectionEnd,
                selectionStart,
              } = (
                target
              )

              setTimeout(() => {
                if (
                  cellRef
                  .current
                ) {
                  cellRef
                  .current
                  .setSelectionRange(
                    selectionStart,
                    selectionEnd,
                    selectionDirection,
                  )
                }
              })
            },
            [],
          )
        )

        return (
          <div>
            <div>
              <label htmlFor={id}>
                {
                  (
                    isFocused
                    && calculation
                  )
                  ? (
                    `${id} ${cellValue}`
                  )
                  : (
                    calculation
                    ? `${id} ${calculation}`
                    : id
                  )
                }
              </label>
            </div>

            <div>
              <Field>
                <input
                  id={id}
                  name={
                    (
                      isFocused
                      && calculation
                    )
                    ? `calculation.${id}`
                    : id
                  }
                  onBlur={onBlur}
                  onChange={onChange}
                  onFocus={onFocus}
                  ref={cellRef}
                />
              </Field>
            </div>
          </div>
        )
      },
      [],
    )
  )

  const formChanged = (
    useCallback(
      ({
        fieldName,
        value,
        values,
      }) => {
        let returnValueAssembly = {
          [fieldName]: value,
        }

        if (
          fieldName
          .startsWith('calculation')
          && (
            !(
              getIsRangeCalculation(
                value
              )
            )
          )
        ) {
          const cellName = (
            fieldName
            .replace(
              /^calculation\.([a-zA-Z]\d)$/,
              '$1',
            )
          )

          returnValueAssembly = {
            ...returnValueAssembly,
            [cellName]: (
              value
            ),
            [fieldName]: (
              ''
            ),
          }
        }

        if (
          !(
            fieldName
            .startsWith('calculation')
          )
          && (
            getIsRangeCalculation(
              value
            )
          )
        ) {
          returnValueAssembly = {
            ...returnValueAssembly,
            [fieldName]: (
              calculateRangeValue({
                calculation: value,
                values,
              })
            ),
            [`calculation.${fieldName}`]: (
              value
            ),
          }
        }

        const calculatedFields = (
          Object
          .entries(
            values
          )
          .filter(([
            calculatedFieldName,
            calculatedFieldValue,
          ]) => (
            (
              calculatedFieldName
              .startsWith('calculation')
            )
            && (
              calculatedFieldValue !== ''
            )
            && (
              calculatedFieldName !== fieldName
            )
          ))
          .map(([
            calculationId,
            calculation,
          ]) => ({
            calculation,
            fieldName: (
              calculationId
              .replace(
                /^calculation\.([a-zA-Z]\d)$/,
                '$1',
              )
            ),
          }))
        )

        if (calculatedFields.length > 0) {
          const calculatedFieldValues = (
            Object
            .fromEntries(
              calculatedFields
              .map(({
                calculation,
                fieldName,
              }) => ([
                fieldName,
                (
                  calculateRangeValue({
                    calculation,
                    values,
                  })
                ),
              ]))
            )
          )

          returnValueAssembly = {
            ...returnValueAssembly,
            ...calculatedFieldValues,
          }
        }

        return returnValueAssembly
      },
      [
        calculateRangeValue,
        getIsRangeCalculation,
      ],
    )
  )

  return (
    <div>
      <div>
        <p>
          Summation:
          <code>
            =SUM(A1:B1)
          </code>
        </p>

        <p>
          Average:
          <code>
            =AVG(A1:A3)
          </code>
        </p>
      </div>

      <div>
        <OneForm onChange={formChanged}>
          <div data-table>
            {
              cells
              .map((
                id,
              ) => (
                <Cell
                  id={id}
                  key={id}
                />
              ))
            }
          </div>
        </OneForm>
      </div>
    </div>
  )
}
