/* eslint-disable react/prop-types */
import {
  action,
} from '@storybook/addon-actions'

import Field from './Field.jsx'
import OneFormProvider from './OneFormProvider.jsx'

export default {
  args: {
    onInput: action(),
    onSubmit: action(),
  },
  argTypes: {
    onInput: 'changed',
    onSubmit: 'submitted',
  },
  component: OneForm,
  title: 'OneForm',
}

export const DisplayInputValue = (
  args,
) => (
  <OneFormProvider {...args}>
    <Field>
      <input name="message" />
    </Field>
  </OneFormProvider>
)
