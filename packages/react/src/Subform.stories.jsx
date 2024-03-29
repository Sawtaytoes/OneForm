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
import OneFormProvider from './OneFormProvider.jsx'
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
  <OneFormProvider>
    <Subform {...args} />
    <FieldValue name="message" />
  </OneFormProvider>
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
    <OneFormProvider values={oneformValues}>
      <Subform {...args} />

      <div>
        <FieldValue name="message1" />
      </div>

      <div>
        <FieldValue name="message2" />
      </div>
    </OneFormProvider>
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
  <OneFormProvider>
    <Subform {...args} />
    <FieldValue name="message" />
  </OneFormProvider>
)

UpdatedValues
.args = {
  updatedValues: {
    message: 'I am LEGEND!',
  },
}

const RandomNumberFieldValue = () => {
  useFieldValue({
    name: 'changingMessage',
  })

  return (
    <div>
      <Subform
        updatedValues={{
          randomNumber: (
            Math
            .random()
          ),
        }}
      />

      <FieldValue name="randomNumber" />
    </div>
  )
}

export const MultipleUpdatedValues = (
  args,
) => (
  <OneFormProvider>
    <Subform {...args} />

    <RandomNumberFieldValue />

    <div>
      <Field>
        <input name="staticMessage" />
      </Field>
    </div>

    <div>
      <Field>
        <input name="changingMessage" />
      </Field>
    </div>
  </OneFormProvider>
)

MultipleUpdatedValues
.args = {
  updatedValues: {
    staticMessage: 'I am LEGEND!',
  },
}

export const ErrorMessages = (
  args,
) => (
  <OneFormProvider>
    <Subform {...args} />
    <FieldErrorMessage name="message" />
  </OneFormProvider>
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
  <OneFormProvider>
    <Subform {...args} />
    <FieldErrorMessage name="message" />
  </OneFormProvider>
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
  <OneFormProvider>
    <Subform {...args} />

    <div>
      <Field>
        <input name="message" />
      </Field>
    </div>

    <div>
      <FieldErrorMessage name="message" />
    </div>
  </OneFormProvider>
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
  <OneFormProvider>
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
  </OneFormProvider>
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
  <OneFormProvider>
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
  </OneFormProvider>
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
  <OneFormProvider>
    <Subform {...args} />

    <button type="submit">
      Submit
    </button>
  </OneFormProvider>
)
