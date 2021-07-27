/* eslint-disable react/prop-types */
import FieldErrorMessage from './FieldErrorMessage.jsx'
import htmlStyleDecorators from './htmlStyleDecorators.jsx'
import IfFieldErrorMessage from './IfFieldErrorMessage.jsx'
import OneForm from './OneForm.jsx'

export default {
  decorators: htmlStyleDecorators,
  title: 'Fields/IfFieldErrorMessage',
}

export const Default = (
  updatedErrorMessages,
) => (
  <OneForm
    updatedErrorMessages={updatedErrorMessages}
  >
    <IfFieldErrorMessage name="message">
      Error: <FieldErrorMessage name="message" />
    </IfFieldErrorMessage>
  </OneForm>
)

Default
.args = {
  message: 'This is my field error.',
}

export const Fallback = (
  updatedErrorMessages,
) => (
  <OneForm
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
  </OneForm>
)

Fallback
.args = {
  message: '',
}

export const CustomVisibility = (
  updatedErrorMessages,
) => (
  <OneForm
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
  </OneForm>
)

CustomVisibility
.args = {
  message: '1',
}
