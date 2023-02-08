import {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'

import {
  htmlStyleDecorators,
} from './htmlStyleDecorators'
import {
  OneFormProvider,
} from './OneFormProvider'
import {
  SubmitField,
} from './SubmitField'

const storybookMeta: (
  ComponentMeta<
    typeof SubmitField
  >
) = {
  component: SubmitField,
  decorators: htmlStyleDecorators,
  title: 'Fields/SubmitField',
}

export default storybookMeta

export const Submission: (
  ComponentStory<
    typeof OneFormProvider
  >
) = (
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
