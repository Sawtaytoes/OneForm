/* eslint-disable react/prop-types */
import { action } from '@storybook/addon-actions'

import FieldErrorMessage from './FieldErrorMessage.jsx'
import OneForm from './OneForm.jsx'

export default {
  title: 'Fields/FieldErrorMessage',
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
