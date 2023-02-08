import {
  ComponentMeta,
  Story,
} from '@storybook/react'

import {
  FieldErrorMessage
} from './FieldErrorMessage'
import {
  htmlStyleDecorators,
} from './htmlStyleDecorators'
import {
  OneFormProvider,
} from './OneFormProvider'
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
  Story<
    Errors
  >
) = (
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

export const StyledText: (
  Story<
    Errors
  >
) = (
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
