import {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'

import {
  FieldErrorMessage
} from './FieldErrorMessage'
import {
  htmlStyleDecorators,
} from './htmlStyleDecorators'
import {
  OneFormProvider ,
} from './OneFormProvider '
import {
  Errors,
} from './useErrorMessagesState'

const storybookMeta: (
  ComponentMeta<
    typeof FieldErrorMessage
  >
) = {
  component: FieldErrorMessage,
  decorators: htmlStyleDecorators,
  title: 'Fields/FieldErrorMessage',
}

export default storybookMeta

export const Text: (
  ComponentStory<
    typeof OneFormProvider
  >
) = (
  updatedErrorMessages: (
    Errors
  ),
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

export const StyledText: (
  ComponentStory<
    typeof OneFormProvider
  >
) = (
  updatedErrorMessages: (
    Errors
  ),
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
