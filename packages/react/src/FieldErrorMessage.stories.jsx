/* eslint-disable react/prop-types */
import { action } from '@storybook/addon-actions'

import FieldErrorMessage from './FieldErrorMessage.jsx'
import OneForm from './OneForm.jsx'

export default {
  args: {
    onChange: action(),
    onSubmit: action(),
  },
  argTypes: {
    onChange: 'changed',
    onSubmit: 'submitted',
  },
  title: 'Components/FieldErrorMessage',
}

export const Text = (
  updatedErrorMessages,
) => (
  <OneForm
    updatedErrorMessages={updatedErrorMessages}
  >
    <FieldErrorMessage name="message" />
  </OneForm>
)

Text
.args = {
  message: 'This is my field error.',
}

export const StyledText = (
  updatedErrorMessages,
) => (
  <OneForm
    updatedErrorMessages={updatedErrorMessages}
  >
    <div
      style={{
        color: 'red',
      }}
    >
      <FieldErrorMessage name="message" />
    </div>
  </OneForm>
)

StyledText
.args = {
  message: 'This field error is styled.',
}

export const Children = (
  updatedErrorMessages,
) => (
  <OneForm
    updatedErrorMessages={updatedErrorMessages}
  >
    <FieldErrorMessage name="message">
      <div
        style={{
          color: 'salmon',
        }}
      />
    </FieldErrorMessage>
  </OneForm>
)

Children
.args = {
  message: 'This is an error message passed down to children.',
}

export const Fallback = (
  updatedErrorMessages,
) => (
  <OneForm
    updatedErrorMessages={updatedErrorMessages}
  >
    <FieldErrorMessage
      fallback={
        <div>
          No value yet.
        </div>
      }
      name="message"
    >
      <div />
    </FieldErrorMessage>
  </OneForm>
)

Fallback
.args = {
  message: '',
}

export const CustomVisibility = (
  updatedErrorMessages,
) => (
  <OneForm
    updatedErrorMessages={updatedErrorMessages}
  >
    <FieldErrorMessage
      fallback={
        <div>
          Fallback activated when value is &quot;1&quot;.
        </div>
      }
      getIsVisible={(
        errorMessages,
      ) => (
        !(
          errorMessages
          .some((
            errorMessage,
          ) => (
            errorMessage === '1'
          ))
        )
      )}
      name="message"
    >
      <div />
    </FieldErrorMessage>
  </OneForm>
)

CustomVisibility
.args = {
  message: '1',
}
