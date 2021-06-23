# useField\(\)

This hook is meant for writing **custom** `<Field />` components.

{% hint style="warning" %}
You're most-likely wanting **`useFieldData`**.
{% endhint %}

### Props in

| Prop Name | Description |
| :--- | :--- |
| `name` | The base field name without a `/`. |
| `onChange` | Called when the returned `valueChanged` is called.  |
| `onVisit` | Called when the returned`fieldVisited` is called. |

### Props out

<table>
  <thead>
    <tr>
      <th style="text-align:left">Prop Name</th>
      <th style="text-align:left">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left"><code>errorMessages</code>
      </td>
      <td style="text-align:left">
        <p>Array of error message strings.</p>
        <p><em>When changed, this value is updated.</em>
        </p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><code>fieldName</code>
      </td>
      <td style="text-align:left">The OneForm field name with a <code>/</code>.</td>
    </tr>
    <tr>
      <td style="text-align:left"><code>fieldVisited</code>
      </td>
      <td style="text-align:left">
        <p>A callback function for when a field is visited.</p>
        <p><em>This expects to receive an HTML<code>onBlur</code> event.</em>
        </p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><code>isVisited</code>
      </td>
      <td style="text-align:left">String value of the <code>isVisited</code>.</td>
    </tr>
    <tr>
      <td style="text-align:left"><code>value</code>
      </td>
      <td style="text-align:left">Current field value.
        <br /><em>When changed, value is updated.</em>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><code>valueChanged</code>
      </td>
      <td style="text-align:left">A callback function for when a field value changes.
        <br /><em>This expects to receive an HTML<code>onChange</code> event.</em>
      </td>
    </tr>
  </tbody>
</table>

## When to use?

Common use case would be creating your own `<Field />` component. Even then, there are better ways of doing this than creating your own.

Here's an example of a custom `<Field />` component:

```jsx
import PropTypes from 'prop-types'
import {
  cloneElement,
  memo,
  useMemo,
} from 'react'

import useField from './useField.js'

const propTypes = {
  children: PropTypes.node.isRequired,
}

const FieldExample = ({
  children,
}) => {
  const {
    name,
    onBlur: onChildBlur,
    onChange: onChildChange,
  } = (
    children
    .props
  )

  const {
    errorMessages,
    fieldName,
    fieldVisited,
    isVisited,
    value,
    valueChanged,
  } = (
    useField({
      name,
      onChange: onChildChange,
      onVisit: onChildBlur,
    })
  )

  const childProps = (
    useMemo(
      () => ({
        errorMessages,
        isVisited,
        name: fieldName,
        onBlur: fieldVisited,
        onChange: valueChanged,
        value,
      }),
      [
        errorMessages,
        fieldName,
        fieldVisited,
        isVisited,
        value,
        valueChanged,
      ],
    )
  )

  return (
    cloneElement(
      children,
      childProps,
    )
  )
}

Field.propTypes = propTypes

const MemoizedField = memo(Field)

export default MemoizedField

```

