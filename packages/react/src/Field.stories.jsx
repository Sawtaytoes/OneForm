/* eslint-disable react/prop-types */
import {
  action,
} from '@storybook/addon-actions'

import Field from './Field'
import FieldValue from './FieldValue'
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
  component: Field,
  decorators: htmlStyleDecorators,
  title: 'Fields/Field',
}

export const HTMLInput = (
  args,
) => (
  <OneFormProvider {...args}>
    <div>
      <Field>
        <input name="message" />
      </Field>
    </div>
  </OneFormProvider>
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
  <OneFormProvider {...args}>
    <div>
      <Field>
        <Input name="message" />
      </Field>
    </div>
  </OneFormProvider>
)

export const HTMLCheckbox = (
  args,
) => (
  <OneFormProvider {...args}>
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
  </OneFormProvider>
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
  <OneFormProvider {...args}>
    <div>
      <Field>
        <Checkbox
          name="checkbox"
          value="This is my checkbox value."
        />
      </Field>
    </div>
  </OneFormProvider>
)

export const HTMLRadio = (
  args,
) => (
  <OneFormProvider {...args}>
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
  </OneFormProvider>
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
  <OneFormProvider {...args}>
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
  </OneFormProvider>
)

export const HTMLSelect = (
  args,
) => (
  <OneFormProvider {...args}>
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
  </OneFormProvider>
)

export const HTMLSelectOptionGroupValue = (
  args,
) => (
  <OneFormProvider {...args}>
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
  </OneFormProvider>
)

export const HTMLMultiSelect = (
  args,
) => (
  <OneFormProvider {...args}>
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
  </OneFormProvider>
)

const MultiPicker = ({
  name,
  onChange,
  value,
}) => (
  <div>
    <label htmlFor="red">
      <input
        checked={
          value
          .includes(
            'red'
          )
        }
        id="red"
        name={name}
        onChange={onChange}
        type="checkbox"
        value="red"
      />

      Red
    </label>

    <label htmlFor="yellow">
      <input
        checked={
          value
          .includes(
            'yellow'
          )
        }
        id="yellow"
        name={name}
        onChange={onChange}
        type="checkbox"
        value="yellow"
      />

      Yellow
    </label>

    <label htmlFor="green">
      <input
        checked={
          value
          .includes(
            'green'
          )
        }
        id="green"
        name={name}
        onChange={onChange}
        type="checkbox"
        value="green"
      />

      Green
    </label>

    <label htmlFor="blue">
      <input
        checked={
          value
          .includes(
            'blue'
          )
        }
        id="blue"
        name={name}
        onChange={onChange}
        type="checkbox"
        value="blue"
      />

      Blue
    </label>
  </div>
)

export const MultiPickerComponent = (
  args,
) => (
  <OneFormProvider {...args}>
    <label>
      <Field isMultipleElement>
        <MultiPicker
          name="color"
        />
      </Field>
    </label>

    <div>
      Selected Colors: <FieldValue name="color" />
    </div>
  </OneFormProvider>
)

export const HTMLColor = (
  args,
) => (
  <OneFormProvider {...args}>
    <div>
      <Field>
        <input
          name="color"
          type="color"
        />
      </Field>
    </div>
  </OneFormProvider>
)

export const HTMLDate = (
  args,
) => (
  <OneFormProvider {...args}>
    <div>
      <Field>
        <input
          name="date"
          type="date"
        />
      </Field>
    </div>
  </OneFormProvider>
)

export const HTMLTime = (
  args,
) => (
  <OneFormProvider {...args}>
    <div>
      <Field>
        <input
          name="time"
          type="time"
        />
      </Field>
    </div>
  </OneFormProvider>
)

export const HTMLDateTime = (
  args,
) => (
  <OneFormProvider {...args}>
    <div>
      <Field>
        <input
          name="datetime"
          type="datetime-local"
        />
      </Field>
    </div>
  </OneFormProvider>
)

export const HTMLMonth = (
  args,
) => (
  <OneFormProvider {...args}>
    <div>
      <Field>
        <input
          name="month"
          type="month"
        />
      </Field>
    </div>
  </OneFormProvider>
)

export const HTMLWeek = (
  args,
) => (
  <OneFormProvider {...args}>
    <div>
      <Field>
        <input
          name="week"
          type="week"
        />
      </Field>
    </div>
  </OneFormProvider>
)

export const HTMLFile = (
  args,
) => (
  <OneFormProvider {...args}>
    <div>
      <Field>
        <input
          name="file"
          type="file"
        />
      </Field>
    </div>
  </OneFormProvider>
)

export const HTMLFiles = (
  args,
) => (
  <OneFormProvider {...args}>
    <div>
      <Field>
        <input
          multiple
          name="file"
          type="file"
        />
      </Field>
    </div>
  </OneFormProvider>
)

export const HTMLRange = (
  args,
) => (
  <OneFormProvider {...args}>
    <div>
      <Field>
        <input
          name="range"
          type="range"
        />
      </Field>
    </div>
  </OneFormProvider>
)
