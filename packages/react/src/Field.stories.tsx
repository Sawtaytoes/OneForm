import {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
import {
  InputHTMLAttributes,
  ReactNode,
} from 'react'

import {
  Field,
} from './Field'
import {
  FieldValue,
} from './FieldValue'
import {
  Form,
} from './Form'
import {
  htmlStyleDecorators,
} from './htmlStyleDecorators'
import {
  OneFormProvider ,
} from './OneFormProvider '

const storybookMeta: (
  ComponentMeta<
    typeof Field
  >
) = {
  component: Field,
  decorators: htmlStyleDecorators,
  title: 'Fields/Field',
}

export default storybookMeta

export const HTMLInput: (
  ComponentStory<
    typeof Field
  >
) = (
  args,
) => (
  <OneFormProvider>
    <Form>
      <Field {...args}>
        <input name="message" />
      </Field>
    </Form>
  </OneFormProvider>
)

const Input = ({
  name,
  onChange,
}: {
  name?: (
    InputHTMLAttributes<
      HTMLInputElement
    >['name']
  ),
  onChange?: (
    InputHTMLAttributes<
      HTMLInputElement
    >['onChange']
  )
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

export const ReactInputComponent: (
  ComponentStory<
    typeof Field
  >
) = (
  args,
) => (
  <OneFormProvider>
    <Form>
      <Field {...args}>
        <Input name="message" />
      </Field>
    </Form>
  </OneFormProvider>
)

export const HTMLCheckbox: (
  ComponentStory<
    typeof Field
  >
) = (
  args,
) => (
  <OneFormProvider>
    <Form>
      <label>
        <Field {...args}>
          <input
            name="checkbox"
            type="checkbox"
          />
        </Field>

        Check me!
      </label>
    </Form>

    <Form>
      <FieldValue name="checkbox" />
    </Form>
  </OneFormProvider>
)

const Checkbox = ({
  isChecked,
  name,
  onChange,
  value,
}: {
  isChecked?: (
    InputHTMLAttributes<
      HTMLInputElement
    >['checked']
  ),
  name?: (
    InputHTMLAttributes<
      HTMLInputElement
    >['name']
  ),
  onChange?: (
    InputHTMLAttributes<
      HTMLInputElement
    >['onChange']
  ),
  value?: (
    InputHTMLAttributes<
      HTMLInputElement
    >['value']
  ),
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

export const ReactCheckboxComponent: (
  ComponentStory<
    typeof Field
  >
) = (
  args,
) => (
  <OneFormProvider>
    <Form>
      <Field {...args}>
        <Checkbox
          name="checkbox"
          value="This is my checkbox value."
        />
      </Field>
    </Form>
  </OneFormProvider>
)

export const HTMLRadio: (
  ComponentStory<
    typeof Field
  >
) = (
  args,
) => (
  <OneFormProvider>
    <label>
      <Field {...args}>
        <input
          name="item"
          type="radio"
          value="first"
        />
      </Field>

      First
    </label>

    <label>
      <Field {...args}>
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
}: {
  children?: (
    ReactNode
  ),
  name?: (
    InputHTMLAttributes<
      HTMLInputElement
    >['name']
  ),
  onChange?: (
    InputHTMLAttributes<
      HTMLInputElement
    >['onChange']
  ),
  value?: (
    InputHTMLAttributes<
      HTMLInputElement
    >['value']
  ),
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

export const ReactRadioComponent: (
  ComponentStory<
    typeof Field
  >
) = (
  args,
) => (
  <OneFormProvider>
    <Form>
      <Field {...args}>
        <Radio
          name="item"
          value="first"
        >
          First
        </Radio>
      </Field>
    </Form>

    <Form>
      <Field {...args}>
        <Radio
          name="item"
          value="second"
        >
          Second
        </Radio>
      </Field>
    </Form>

    <Form>
      Selected Item: <FieldValue name="item" />
    </Form>
  </OneFormProvider>
)

export const HTMLSelect: (
  ComponentStory<
    typeof Field
  >
) = (
  args,
) => (
  <OneFormProvider>
    <Field {...args}>
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

    <Form>
      Selected Color: <FieldValue name="color" />
    </Form>
  </OneFormProvider>
)

export const HTMLSelectOptionGroupValue: (
  ComponentStory<
    typeof Field
  >
) = (
  args,
) => (
  <OneFormProvider>
    <Field {...args}>
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

    <Form>
      Selected Color: <FieldValue name="color" />
    </Form>
  </OneFormProvider>
)

export const HTMLMultiSelect: (
  ComponentStory<
    typeof Field
  >
) = (
  args,
) => (
  <OneFormProvider>
    <Field {...args}>
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

    <Form>
      Selected Colors: <FieldValue name="color" />
    </Form>
  </OneFormProvider>
)

const MultiPicker = ({
  name,
  onChange,
  value,
}: {
  name?: (
    InputHTMLAttributes<
      HTMLInputElement
    >['name']
  ),
  onChange?: (
    InputHTMLAttributes<
      HTMLInputElement
    >['onChange']
  ),
  value?: (
    string
  ),
}) => (
  <div>
    <label htmlFor="red">
      <input
        checked={
          value
          ?.includes(
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
          ?.includes(
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
          ?.includes(
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
          ?.includes(
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

export const MultiPickerComponent: (
  ComponentStory<
    typeof Field
  >
) = (
  args,
) => (
  <OneFormProvider>
    <label>
      <Field isMultipleElement>
        <MultiPicker
          name="color"
        />
      </Field>
    </label>

    <Form>
      Selected Colors: <FieldValue name="color" />
    </Form>
  </OneFormProvider>
)

export const HTMLColor: (
  ComponentStory<
    typeof Field
  >
) = (
  args,
) => (
  <OneFormProvider>
    <Form>
      <Field {...args}>
        <input
          name="color"
          type="color"
        />
      </Field>
    </Form>
  </OneFormProvider>
)

export const HTMLDate: (
  ComponentStory<
    typeof Field
  >
) = (
  args,
) => (
  <OneFormProvider>
    <Form>
      <Field {...args}>
        <input
          name="date"
          type="date"
        />
      </Field>
    </Form>
  </OneFormProvider>
)

export const HTMLTime: (
  ComponentStory<
    typeof Field
  >
) = (
  args,
) => (
  <OneFormProvider>
    <Form>
      <Field {...args}>
        <input
          name="time"
          type="time"
        />
      </Field>
    </Form>
  </OneFormProvider>
)

export const HTMLDateTime: (
  ComponentStory<
    typeof Field
  >
) = (
  args,
) => (
  <OneFormProvider>
    <Form>
      <Field {...args}>
        <input
          name="datetime"
          type="datetime-local"
        />
      </Field>
    </Form>
  </OneFormProvider>
)

export const HTMLMonth: (
  ComponentStory<
    typeof Field
  >
) = (
  args,
) => (
  <OneFormProvider>
    <Form>
      <Field {...args}>
        <input
          name="month"
          type="month"
        />
      </Field>
    </Form>
  </OneFormProvider>
)

export const HTMLWeek: (
  ComponentStory<
    typeof Field
  >
) = (
  args,
) => (
  <OneFormProvider>
    <Form>
      <Field {...args}>
        <input
          name="week"
          type="week"
        />
      </Field>
    </Form>
  </OneFormProvider>
)

export const HTMLFile: (
  ComponentStory<
    typeof Field
  >
) = (
  args,
) => (
  <OneFormProvider>
    <Form>
      <Field {...args}>
        <input
          name="file"
          type="file"
        />
      </Field>
    </Form>
  </OneFormProvider>
)

export const HTMLFiles: (
  ComponentStory<
    typeof Field
  >
) = (
  args,
) => (
  <OneFormProvider>
    <Form>
      <Field {...args}>
        <input
          multiple
          name="file"
          type="file"
        />
      </Field>
    </Form>
  </OneFormProvider>
)

export const HTMLRange: (
  ComponentStory<
    typeof Field
  >
) = (
  args,
) => (
  <OneFormProvider>
    <Form>
      <Field {...args}>
        <input
          name="range"
          type="range"
        />
      </Field>
    </Form>
  </OneFormProvider>
)
