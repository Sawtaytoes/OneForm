/* eslint-disable react/prop-types */
import { action } from '@storybook/addon-actions'

import OneForm from './OneForm.jsx'

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
  <OneForm {...args} />
)
