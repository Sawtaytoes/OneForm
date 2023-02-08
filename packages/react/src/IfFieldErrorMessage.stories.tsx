import {
  Story,
} from '@storybook/react'

import {
  FieldErrorMessage,
} from './FieldErrorMessage'
import {
  htmlStyleDecorators,
} from './htmlStyleDecorators'
import {
  IfFieldErrorMessage,
} from './IfFieldErrorMessage'
import {
  OneFormProvider,
} from './OneFormProvider'
import {
  Errors,
} from './useErrorMessagesState'

export default {
  decorators: htmlStyleDecorators,
  title: 'Fields/IfFieldErrorMessage',
}

export const Default: (
  Story<
    Errors
  >
) = (
  updatedErrorMessages,
) => (
  <OneFormProvider
    updatedErrorMessages={updatedErrorMessages}
  >
    <IfFieldErrorMessage name="message">
      Error: <FieldErrorMessage name="message" />
    </IfFieldErrorMessage>
  </OneFormProvider>
)

Default
.args = {
  message: 'This is my field error.',
}

export const Fallback: (
  Story<
    Errors
  >
) = (
  updatedErrorMessages,
) => (
  <OneFormProvider
    updatedErrorMessages={updatedErrorMessages}
  >
    <IfFieldErrorMessage
      fallback={
        <div>
          No value yet.
        </div>
      }
      name="message"
    >
      Error: <FieldErrorMessage name="message" />
    </IfFieldErrorMessage>
  </OneFormProvider>
)

Fallback
.args = {
  message: '',
}

export const CustomVisibility: (
  Story<
    Errors
  >
) = (
  updatedErrorMessages,
) => (
  <OneFormProvider
    updatedErrorMessages={updatedErrorMessages}
  >
    <IfFieldErrorMessage
      fallback={
        <div>
          Fallback activated when value is &quot;1&quot;.
        </div>
      }
      getIsVisible={(
        errorMessages,
      ) => (
        !(
          errorMessages
          .some((
            errorMessage,
          ) => (
            errorMessage === '1'
          ))
        )
      )}
      name="message"
    >
      Error: <FieldErrorMessage name="message" />
    </IfFieldErrorMessage>
  </OneFormProvider>
)

CustomVisibility
.args = {
  message: '1',
}
