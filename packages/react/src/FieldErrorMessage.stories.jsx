/* eslint-disable react/prop-types */
import FieldErrorMessage from './FieldErrorMessage.jsx'
import htmlStyleDecorators from './htmlStyleDecorators.jsx'
import OneForm from './OneForm.jsx'

export default {
  decorators: htmlStyleDecorators,
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
