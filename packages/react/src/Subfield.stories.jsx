/* eslint-disable react/prop-types */
import {
  action,
} from '@storybook/addon-actions'

import Field from './Field.jsx'
import FieldValue from './FieldValue.jsx'
import htmlStyleDecorators from './htmlStyleDecorators.jsx'
import OneForm from './OneForm.jsx'
import Subfield from './Subfield.jsx'

export default {
  args: {
    onChange: action(),
    onSubmit: action(),
  },
  argTypes: {
    onChange: 'changed',
    onSubmit: 'submitted',
  },
  component: Subfield,
  decorators: htmlStyleDecorators,
  title: 'Fields/Subfield',
}

export const MultiPickerComponent = (
  args,
) => (
  <OneForm {...args}>
    <label>
      <Field isMultipleElement>
        <div name="color">
          <label htmlFor="red">
            <Subfield>
              <input
                id="red"
                name={name}
                type="checkbox"
                value="red"
              />
            </Subfield>

            Red
          </label>

          <label htmlFor="yellow">
            <Subfield>
              <input
                id="yellow"
                name={name}
                type="checkbox"
                value="yellow"
              />
            </Subfield>

            Yellow
          </label>

          <label htmlFor="green">
            <Subfield>
              <input
                id="green"
                name={name}
                type="checkbox"
                value="green"
              />
            </Subfield>

            Green
          </label>

          <label htmlFor="blue">
            <Subfield>
              <input
                id="blue"
                name={name}
                type="checkbox"
                value="blue"
              />
            </Subfield>

            Blue
          </label>
        </div>
      </Field>
    </label>

    <div>
      Selected Colors: <FieldValue name="color" />
    </div>
  </OneForm>
)
