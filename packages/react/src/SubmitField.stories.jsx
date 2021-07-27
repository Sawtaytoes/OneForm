/* eslint-disable react/prop-types */
import {
  action,
} from '@storybook/addon-actions'

import htmlStyleDecorators from './htmlStyleDecorators.jsx'
import OneForm from './OneForm.jsx'
import SubmitField from './SubmitField.jsx'

export default {
  args: {
    onChange: action(),
    onSubmit: action(),
  },
  argTypes: {
    onChange: 'changed',
    onSubmit: 'submitted',
  },
  // component: SubmitField,
  decorators: htmlStyleDecorators,
  title: 'Fields/SubmitField',
}

export const Submission = (
  args,
) => (
  <OneForm {...args}>
    <SubmitField>
      <button type="submit">
        Submit
      </button>
    </SubmitField>
  </OneForm>
)

Submission
.args = {
  onSubmit: ({
    registeredValues,
  }) => {
    action()(
      registeredValues
    )

    return (
      new Promise((
        resolve,
      ) => {
        setTimeout(
          resolve,
          1000,
        )
      })
    )
  },
}
