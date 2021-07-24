/* eslint-disable react/prop-types */
import FieldValue from './FieldValue.jsx'
import IfFieldValue from './IfFieldValue.jsx'
import OneForm from './OneForm.jsx'

export default {
  title: 'Fields/IfFieldValue',
}

export const Default = (
  updatedValues,
) => (
  <OneForm
    updatedValues={updatedValues}
  >
    <IfFieldValue name="message">
      Field: <FieldValue name="message" />
    </IfFieldValue>
  </OneForm>
)

Default
.args = {
  message: '',
}

export const Fallback = (
  updatedValues,
) => (
  <OneForm
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
  </OneForm>
)

Fallback
.args = {
  message: '',
}

export const CustomVisibility = (
  updatedValues,
) => (
  <OneForm
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
  </OneForm>
)

CustomVisibility
.args = {
  message: '1',
}
