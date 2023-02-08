import {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
import {
  useMemo,
} from 'react'

import {
  Field,
} from './Field'
import {
  FieldErrorMessage,
} from './FieldErrorMessage'
import {
  FieldValue,
} from './FieldValue'
import {
  Form,
} from './Form'
import {
  SubmitField,
} from './SubmitField'
import {
  htmlStyleDecorators,
} from './htmlStyleDecorators'
import {
  OneFormProvider,
} from './OneFormProvider'
import {
  Subform,
} from './Subform'
import {
  useFieldValue,
} from './useFieldValue'

const storybookMeta: (
  ComponentMeta<
    typeof Subform
  >
) = {
  component: Subform,
  decorators: htmlStyleDecorators,
  title: 'Forms/Subform',
}

export default storybookMeta

export const Values: (
  ComponentStory<
    typeof Subform
  >
) = (
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

export const CombinedValues: (
  ComponentStory<
    typeof Subform
  >
) = (
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

export const UpdatedValues: (
  ComponentStory<
    typeof Subform
  >
) = (
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

export const MultipleUpdatedValues: (
  ComponentStory<
    typeof Subform
  >
) = (
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

export const ErrorMessages: (
  ComponentStory<
    typeof Subform
  >
) = (
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

export const UpdatedErrorMessages: (
  ComponentStory<
    typeof Subform
  >
) = (
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

export const GroupValidation: (
  ComponentStory<
    typeof Subform
  >
) = (
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

export const OnChange: (
  ComponentStory<
    typeof Subform
  >
) = (
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
  onChange: (
    action(({
      value,
    }) => ({
      copiedMessage: value,
      message: value,
    }))
  ),
}

export const OnSubmit: (
  ComponentStory<
    typeof Subform
  >
) = (
  args,
) => (
  <OneFormProvider>
    <Subform {...args} />

    <Form>
      <form>
        <button type="submit">
          Submit
        </button>
      </form>
    </Form>
  </OneFormProvider>
)
