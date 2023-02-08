/* eslint-disable react/prop-types */
import FieldValue from './FieldValue'
import htmlStyleDecorators from './htmlStyleDecorators'
import OneFormProvider from './OneFormProvider'

export default {
  decorators: htmlStyleDecorators,
  title: 'Fields/FieldValue',
}

export const Text = (
  updatedValues,
) => (
  <OneFormProvider
    updatedValues={updatedValues}
  >
    <FieldValue name="message" />
  </OneFormProvider>
)

Text
.args = {
  message: 'This is my field value.',
}

export const StyledText = (
  updatedValues,
) => (
  <OneFormProvider
    updatedValues={updatedValues}
  >
    <div
      style={{
        color: 'green',
      }}
    >
      <FieldValue name="message" />
    </div>
  </OneFormProvider>
)

StyledText
.args = {
  message: 'This field value is styled.',
}
