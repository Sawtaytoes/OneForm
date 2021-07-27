/* eslint-disable react/prop-types */
import { action } from '@storybook/addon-actions'

import Field from './Field.jsx'
import FieldValue from './FieldValue.jsx'
import htmlStyleDecorators from './htmlStyleDecorators.jsx'
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
  decorators: htmlStyleDecorators,
  title: 'Fields/Field',
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

export const ReactInputComponent = (
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
            name="checkbox"
            type="checkbox"
          />
        </Field>

        Check me!
      </label>
    </div>

    <div>
      <FieldValue name="checkbox" />
    </div>
  </OneForm>
)

const Checkbox = ({
  isChecked,
  name,
  onChange,
  value,
}) => (
  <label
    style={{
      backgroundColor: 'darkred',
      color: 'pink',
    }}
  >
    <input
      checked={isChecked}
      name={name}
      onChange={onChange}
      type="checkbox"
      value={value}
    />

    Check me!
  </label>
)

export const ReactCheckboxComponent = (
  args,
) => (
  <OneForm {...args}>
    <div>
      <Field>
        <Checkbox
          name="checkbox"
          value="This is my checkbox value."
        />
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
          name="item"
          type="radio"
          value="first"
        />
      </Field>

      First
    </label>

    <label>
      <Field>
        <input
          name="item"
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
  <label
    style={{
      backgroundColor: 'darkgreen',
      color: 'lightgreen',
    }}
  >
    <input
      name={name}
      onChange={onChange}
      type="radio"
      value={value}
    />

    {children}
  </label>
)

export const ReactRadioComponent = (
  args,
) => (
  <OneForm {...args}>
    <div>
      <Field>
        <Radio
          name="item"
          value="first"
        >
          First
        </Radio>
      </Field>
    </div>

    <div>
      <Field>
        <Radio
          name="item"
          value="second"
        >
          Second
        </Radio>
      </Field>
    </div>

    <div>
      Selected Item: <FieldValue name="item" />
    </div>
  </OneForm>
)

export const HTMLSelect = (
  args,
) => (
  <OneForm {...args}>
    <Field>
      <select name="color">
        <option value="">
          Select a color.
        </option>

        <option value="red">
          Red
        </option>

        <option value="yellow">
          Yellow
        </option>

        <option value="green">
          Green
        </option>

        <option value="blue">
          Blue
        </option>
      </select>
    </Field>

    <div>
      Selected Color: <FieldValue name="color" />
    </div>
  </OneForm>
)

export const HTMLSelectOptionGroupValue = (
  args,
) => (
  <OneForm {...args}>
    <Field>
      <select name="color">
        <option value="">
          Select a color.
        </option>

        <optgroup label="Warm">
          <option value="red">
            Red
          </option>

          <option value="yellow">
            Yellow
          </option>
        </optgroup>

        <optgroup label="Cool">
          <option value="green">
            Green
          </option>

          <option value="blue">
            Blue
          </option>
        </optgroup>
      </select>
    </Field>

    <div>
      Selected Color: <FieldValue name="color" />
    </div>
  </OneForm>
)

export const HTMLMultiSelect = (
  args,
) => (
  <OneForm {...args}>
    <Field>
      <select
        multiple
        name="color"
      >
        <option value="red">
          Red
        </option>

        <option value="yellow">
          Yellow
        </option>

        <option value="green">
          Green
        </option>

        <option value="blue">
          Blue
        </option>
      </select>
    </Field>

    <div>
      Selected Colors: <FieldValue name="color" />
    </div>
  </OneForm>
)

export const HTMLColor = (
  args,
) => (
  <OneForm {...args}>
    <div>
      <Field>
        <input
          name="color"
          type="color"
        />
      </Field>
    </div>
  </OneForm>
)

export const HTMLDate = (
  args,
) => (
  <OneForm {...args}>
    <div>
      <Field>
        <input
          name="date"
          type="date"
        />
      </Field>
    </div>
  </OneForm>
)

export const HTMLTime = (
  args,
) => (
  <OneForm {...args}>
    <div>
      <Field>
        <input
          name="time"
          type="time"
        />
      </Field>
    </div>
  </OneForm>
)

export const HTMLDateTime = (
  args,
) => (
  <OneForm {...args}>
    <div>
      <Field>
        <input
          name="datetime"
          type="datetime-local"
        />
      </Field>
    </div>
  </OneForm>
)

export const HTMLMonth = (
  args,
) => (
  <OneForm {...args}>
    <div>
      <Field>
        <input
          name="month"
          type="month"
        />
      </Field>
    </div>
  </OneForm>
)

export const HTMLWeek = (
  args,
) => (
  <OneForm {...args}>
    <div>
      <Field>
        <input
          name="week"
          type="week"
        />
      </Field>
    </div>
  </OneForm>
)

export const HTMLFile = (
  args,
) => (
  <OneForm {...args}>
    <div>
      <Field>
        <input
          name="file"
          type="file"
        />
      </Field>
    </div>
  </OneForm>
)

export const HTMLFiles = (
  args,
) => (
  <OneForm {...args}>
    <div>
      <Field>
        <input
          multiple
          name="file"
          type="file"
        />
      </Field>
    </div>
  </OneForm>
)

export const HTMLRange = (
  args,
) => (
  <OneForm {...args}>
    <div>
      <Field>
        <input
          name="range"
          type="range"
        />
      </Field>
    </div>
  </OneForm>
)
