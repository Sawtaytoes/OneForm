/* eslint-disable react/prop-types */
import FieldErrorMessage from './FieldErrorMessage.jsx'
import htmlStyleDecorators from './htmlStyleDecorators.jsx'
import OneFormProvider from './OneFormProvider.jsx'

export default {
  decorators: htmlStyleDecorators,
  title: 'Fields/FieldErrorMessage',
}

export const Text = (
  updatedErrorMessages,
) => (
  <OneFormProvider
    updatedErrorMessages={updatedErrorMessages}
  >
    <FieldErrorMessage name="message" />
  </OneFormProvider>
)

Text
.args = {
  message: 'This is my field error.',
}

export const StyledText = (
  updatedErrorMessages,
) => (
  <OneFormProvider
    updatedErrorMessages={updatedErrorMessages}
  >
    <div
      style={{
        color: 'red',
      }}
    >
      <FieldErrorMessage name="message" />
    </div>
  </OneFormProvider>
)

StyledText
.args = {
  message: 'This field error is styled.',
}
