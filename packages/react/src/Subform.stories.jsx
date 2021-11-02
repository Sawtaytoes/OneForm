/* eslint-disable react/prop-types */
import {
  action,
} from '@storybook/addon-actions'
import {
  useMemo,
} from 'react'

import Field from './Field.jsx'
import FieldErrorMessage from './FieldErrorMessage.jsx'
import FieldValue from './FieldValue.jsx'
import SubmitField from './SubmitField.jsx'
import htmlStyleDecorators from './htmlStyleDecorators.jsx'
import OneForm from './OneForm.jsx'
import Subform from './Subform.jsx'
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
  component: Subform,
  decorators: htmlStyleDecorators,
  title: 'Forms/Subform',
}

export const Values = (
  args,
) => (
  <OneForm>
    <Subform {...args} />
    <FieldValue name="message" />
  </OneForm>
)

Values
.args = {
  values: {
    message: 'Hello World!',
  },
}

export const CombinedValues = (
  args,
) => {
  const oneformValues = (
    useMemo(
      () => ({
        message1: 'OneForm value',
        message2: 'OneForm value to be overridden',
      }),
      [],
    )
  )

  return (
    <OneForm values={oneformValues}>
      <Subform {...args} />

      <div>
        <FieldValue name="message1" />
      </div>

      <div>
        <FieldValue name="message2" />
      </div>
    </OneForm>
  )
}

CombinedValues
.args = {
  values: {
    message2: 'Subform value',
  },
}

export const UpdatedValues = (
  args,
) => (
  <OneForm>
    <Subform {...args} />
    <FieldValue name="message" />
  </OneForm>
)

UpdatedValues
.args = {
  updatedValues: {
    message: 'I am LEGEND!',
  },
}

export const DoubleUpdatedValues = (
  args,
) => {
  useFieldValue({
    name: 'message2'
  })

  return (
    <OneForm>
      <Subform {...args} />

      <div>
        <Field>
          <input name="message1" />
        </Field>
      </div>

      <div>
        <Field>
          <input name="message2" />
        </Field>
      </div>
    </OneForm>
  )
}

DoubleUpdatedValues
.args = {
  updatedValues: {
    message1: 'I am LEGEND!',
  },
}

export const ErrorMessages = (
  args,
) => (
  <OneForm>
    <Subform {...args} />
    <FieldErrorMessage name="message" />
  </OneForm>
)

ErrorMessages
.args = {
  errorMessages: {
    message: [
      'You need to pass in a value.',
    ],
  },
}

export const UpdatedErrorMessages = (
  args,
) => (
  <OneForm>
    <Subform {...args} />
    <FieldErrorMessage name="message" />
  </OneForm>
)

UpdatedErrorMessages
.args = {
  updatedErrorMessages: {
    message: [
      'Your value isn\'t worthy.',
    ],
  },
}

export const Validations = (
  args,
) => (
  <OneForm>
    <Subform {...args} />

    <div>
      <Field>
        <input name="message" />
      </Field>
    </div>

    <div>
      <FieldErrorMessage name="message" />
    </div>
  </OneForm>
)

Validations
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
  <OneForm>
    <Subform {...args} />

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

export const OnChange = (
  args,
) => (
  <OneForm>
    <Subform {...args} />

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
  </OneForm>
)

OnChange
.args = {
  onChange: ({
    value,
  }) => ({
    copiedMessage: value,
    message: value,
  }),
}

export const OnSubmit = (
  args,
) => (
  <OneForm>
    <Subform {...args} />

    <button type="submit">
      Submit
    </button>
  </OneForm>
)
