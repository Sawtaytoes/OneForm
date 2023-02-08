import {
  action,
} from '@storybook/addon-actions'

import {
  htmlStyleDecorators,
} from './htmlStyleDecorators'
import {
  OneFormProvider ,
} from './OneFormProvider '
import { SubmitField } from './SubmitField'

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
  <OneFormProvider {...args}>
    <SubmitField>
      <button type="submit">
        Submit
      </button>
    </SubmitField>
  </OneFormProvider>
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
