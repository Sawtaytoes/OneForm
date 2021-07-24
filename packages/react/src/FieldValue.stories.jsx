/* eslint-disable react/prop-types */
import { action } from '@storybook/addon-actions'

import FieldValue from './FieldValue.jsx'
import OneForm from './OneForm.jsx'

export default {
  title: 'Fields/FieldValue',
}

export const Text = (
  updatedValues,
) => (
  <OneForm
    updatedValues={updatedValues}
  >
    <FieldValue name="message" />
  </OneForm>
)

Text
.args = {
  message: 'This is my field value.',
}

export const StyledText = (
  updatedValues,
) => (
  <OneForm
    updatedValues={updatedValues}
  >
    <div
      style={{
        color: 'green',
      }}
    >
      <FieldValue name="message" />
    </div>
  </OneForm>
)

StyledText
.args = {
  message: 'This field value is styled.',
}
