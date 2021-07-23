/* eslint-disable react/prop-types */
import { action } from '@storybook/addon-actions'

import Field from './Field.jsx'
import Subfield from './Subfield.jsx'
import FieldErrorMessage from './FieldErrorMessage.jsx'
import FieldGroup from './FieldGroup.jsx'
import FieldValue from './FieldValue.jsx'
import OneForm from './OneForm.jsx'
import SubmitField from './SubmitField.jsx'

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
  title: 'OneForm',
}

export const DisplayInputValue = (
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

export const InitialValues = (
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

InitialValues
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
          name="message"
          type="checkbox"
          value="The Checkbox Value"
        />
      </Field>

      Checkbox with Value
    </label>

    <div>
      <FieldValue name="message" />
    </div>
  </OneForm>
)

CheckboxWithValue
.args = {
  values: {
    message: '',
  },
}

export const InitialCheckboxValues = (
  args,
) => (
  <OneForm {...args}>
    <label>
      <Field>
        <input
          name="checkbox1"
          type="checkbox"
          value="The First Checkbox Value"
        />
      </Field>

      Checkbox with Value 1
    </label>

    <label>
      <Field>
        <input
          name="checkbox2"
          type="checkbox"
          value="The Second Checkbox Value"
        />
      </Field>

      Checkbox with Value 2
    </label>
  </OneForm>
)

InitialCheckboxValues
.args = {
  values: {
    checkbox1: 'The First Checkbox Value',
    checkbox2: true,
  },
}

export const InitialRadioValues = (
  args,
) => (
  <OneForm {...args}>
    <label>
      <Field>
        <input
          name="message"
          type="radio"
          value="first"
        />
      </Field>

      First
    </label>

    <label>
      <Field>
        <input
          name="message"
          type="radio"
          value="second"
        />
      </Field>

      Second
    </label>

    <div>
      <FieldValue name="message" />
    </div>
  </OneForm>
)

InitialRadioValues
.args = {
  values: {
    message: 'second',
  },
}

export const InitialMultiSelect = (
  args,
) => (
  <OneForm {...args}>
    <label htmlFor="color">
      Select one of many values.
    </label>

    <Field>
      <select
        id="color"
        multiple
        name="color"
      >
        <Subfield>
          <option value="green">
            Green
          </option>
        </Subfield>

        <Subfield>
          <option value="red">
            Red
          </option>
        </Subfield>

        <Subfield>
          <option value="blue">
            Blue
          </option>
        </Subfield>
      </select>
    </Field>

    <div>
      <FieldValue name="color" />
    </div>
  </OneForm>
)

InitialMultiSelect
.args = {
  values: {
    color: [
      'red',
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

export const Validation = (
  args,
) => (
  <OneForm {...args}>
    <div>
      <Field>
        <input name="message" />
      </Field>
    </div>
    <div>
      <FieldErrorMessage name="message" />
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
    message: [
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

export const GroupValidationGrouping = (
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
      id="a452"
      name="itemId"
    >
      <div>
        <Field>
          <input
            name="item"
            placeholder="Item a452"
          />
        </Field>
      </div>

      <div>
        <FieldErrorMessage name="group.error" />
      </div>
    </FieldGroup>

    <FieldGroup
      id="7b23"
      name="itemId"
    >
      <div>
        <Field>
          <input
            name="item"
            placeholder="Item 7b23"
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

GroupValidationGrouping
.args = {
  groupValidations: [
    {
      fieldNames: [
        'item',
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
            .itemId
            .groupString
          )
        ]: (
          values
          .message
          .includes(
            values
            .item
          )
          && (
            'You cannot have items in your message.'
          )
        ),
      }),
      groupNames: [
        'itemId',
      ],
    },
  ],
  updatedValues: {
    'item/itemId:7b23': 'w',
    'item/itemId:a452': 'h',
    'message': 'hw',
  },
}
