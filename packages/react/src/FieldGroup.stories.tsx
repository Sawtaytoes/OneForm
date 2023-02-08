import {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'

import {
  Field,
} from './Field'
import {
  FieldGroup,
} from './FieldGroup'
import {
  htmlStyleDecorators,
} from './htmlStyleDecorators'
import {
  OneFormProvider,
} from './OneFormProvider'

const storybookMeta: (
  ComponentMeta<
    typeof FieldGroup
  >
) = {
  component: FieldGroup,
  decorators: htmlStyleDecorators,
  title: 'Fields/FieldGroup',
}

export default storybookMeta

export const Sample: (
  ComponentStory<
    typeof FieldGroup
  >
) = () => (
  <OneFormProvider>
    <FieldGroup
      id="1"
      name="addressId"
    >
      <div>
        <Field>
          <input
            name="name"
          />
        </Field>
      </div>
      <FieldGroup
        id="1"
        name="emailId"
      >
        <div>
          <Field>
            <input
              name="email"
            />
          </Field>
        </div>
      </FieldGroup>
      <FieldGroup
        id="2"
        name="emailId"
      >
        <div>
          <Field>
            <input
              name="email"
            />
          </Field>
        </div>
      </FieldGroup>
    </FieldGroup>
  </OneFormProvider>
)
