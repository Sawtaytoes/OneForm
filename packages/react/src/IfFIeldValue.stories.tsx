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
  IfFieldValue,
} from './IfFieldValue'
import {
  OneFormProvider,
} from './OneFormProvider'
import {
  Values,
} from './useValuesState'

const storybookMeta: (
  ComponentMeta<
    typeof IfFieldValue
  >
) = {
  component: IfFieldValue,
  decorators: htmlStyleDecorators,
  title: 'Fields/IfFieldValue',
}

export default storybookMeta

export const Default: (
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
    <IfFieldValue name="message">
      Field: <FieldValue name="message" />
    </IfFieldValue>
  </OneFormProvider>
)

Default
.args = {
  message: '',
}

export const Fallback: (
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
    <IfFieldValue
      fallback={
        <div>
          No value yet.
        </div>
      }
      name="message"
    >
      Field: <FieldValue name="message" />
    </IfFieldValue>
  </OneFormProvider>
)

Fallback
.args = {
  message: '',
}

export const CustomVisibility: (
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
    <IfFieldValue
      fallback={
        <div>
          Fallback activated when value is &quot;1&quot;.
        </div>
      }
      getIsVisible={(
        value,
      ) => (
        value !== '1'
      )}
      name="message"
    >
      Field: <FieldValue name="message" />
    </IfFieldValue>
  </OneFormProvider>
)

CustomVisibility
.args = {
  message: '1',
}
