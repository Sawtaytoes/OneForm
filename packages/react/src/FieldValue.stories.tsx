import {
  ComponentMeta,
  Story,
} from '@storybook/react'

import {
  FieldValue,
} from './FieldValue'
import {
  htmlStyleDecorators,
} from './htmlStyleDecorators'
import {
  OneFormProvider,
} from './OneFormProvider'
import {
  Values,
} from './useValuesState'

const storybookMeta: (
  ComponentMeta<
    typeof FieldValue
  >
) = {
  component: FieldValue,
  decorators: htmlStyleDecorators,
  title: 'Fields/FieldValue',
}

export default storybookMeta

export const Text: (
  Story<
    Values<
      string
    >
  >
) = (
  updatedValues,
) => (
  <OneFormProvider
    updatedValues={updatedValues}
  >
    <FieldValue name="message" />
  </OneFormProvider>
)

Text
.args = {
  message: 'This is my field value.',
}

export const StyledText: (
  Story<
    Values<
      string
    >
  >
) = (
  updatedValues,
) => (
  <OneFormProvider
    updatedValues={updatedValues}
  >
    <div
      style={{
        color: 'green',
      }}
    >
      <FieldValue name="message" />
    </div>
  </OneFormProvider>
)

StyledText
.args = {
  message: 'This field value is styled.',
}
