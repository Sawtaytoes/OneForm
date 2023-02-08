/* eslint-disable react/prop-types */
import {
  action,
} from '@storybook/addon-actions'

import Field from './Field'
import {
  FieldGroup,
} from './FieldGroup'
import htmlStyleDecorators from './htmlStyleDecorators'
import OneFormProvider from './OneFormProvider'

export default {
  args: {
    onChange: action(),
    onSubmit: action(),
  },
  argTypes: {
    onChange: 'changed',
    onSubmit: 'submitted',
  },
  decorators: htmlStyleDecorators,
  title: 'Fields/FieldGroup',
}

export const Sample = () => (
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
