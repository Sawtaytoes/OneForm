/* eslint-disable react/prop-types */
import { action } from '@storybook/addon-actions'

import Field from './Field.jsx'
import OneForm from './OneForm.jsx'

export default {
  args: {
    onChange: action(),
    onSubmit: action(),
  },
  argTypes: {
    onChange: 'changed',
    onSubmit: 'submitted',
  },
  component: Field,
  title: 'Components/Field',
}

export const HTMLInput = (
  args,
) => (
  <OneForm {...args}>
    <div>
      <Field>
        <input name="message" />
      </Field>
    </div>
  </OneForm>
)

const Input = ({
  name,
  onChange,
}) => (
  <input
    name={name}
    onChange={onChange}
    style={{
      backgroundColor: 'navy',
      color: 'skyblue',
    }}
  />
)

export const InputComponent = (
  args,
) => (
  <OneForm {...args}>
    <div>
      <Field>
        <Input name="message" />
      </Field>
    </div>
  </OneForm>
)

export const HTMLCheckbox = (
  args,
) => (
  <OneForm {...args}>
    <div>
      <label>
        <Field>
          <input
            name="message"
            type="checkbox"
          />
        </Field>

        Check me!
      </label>
    </div>
  </OneForm>
)

const Checkbox = ({
  name,
  onChange,
}) => (
  <label>
    <input
      name={name}
      onChange={onChange}
      type="checkbox"
    />

    Check me!
  </label>
)

export const CheckboxComponent = (
  args,
) => (
  <OneForm {...args}>
    <div>
      <Field>
        <Checkbox name="message" />
      </Field>
    </div>
  </OneForm>
)

export const HTMLRadio = (
  args,
) => (
  <OneForm {...args}>
    <label>
      <Field>
        <input
          name="message"
          type="radio"
          value="first"
        />
      </Field>

      First
    </label>

    <label>
      <Field>
        <input
          name="message"
          type="radio"
          value="second"
        />
      </Field>

      Second
    </label>
  </OneForm>
)

const Radio = ({
  children,
  name,
  onChange,
  value,
}) => (
  <label>
    <input
      name={name}
      onChange={onChange}
      type="radio"
      value={value}
    />

    {children}
  </label>
)

export const RadioComponent = (
  args,
) => (
  <OneForm {...args}>
    <div>
      <Field>
        <Radio
          name="message"
          value="first"
        >
          First
        </Radio>
      </Field>
    </div>

    <div>
      <Field>
        <Radio
          name="message"
          value="second"
        >
          Second
        </Radio>
      </Field>
    </div>
  </OneForm>
)

export const HTMLSelect = (
  args,
) => (
  <OneForm {...args}>
    <div>
      <Field>
        <select name="color">
          <option value="">
            Color
          </option>

          <option value="green">
            Green
          </option>

          <option value="red">
            Red
          </option>

          <option value="blue">
            Blue
          </option>
        </select>
      </Field>
    </div>
  </OneForm>
)

export const HTMLMultiSelect = (
  args,
) => (
  <OneForm {...args}>
    <div>
      <Field>
        <select
          multiple
          name="color"
        >
          <option value="green">
            Green
          </option>

          <option value="red">
            Red
          </option>

          <option value="blue">
            Blue
          </option>
        </select>
      </Field>
    </div>
  </OneForm>
)
