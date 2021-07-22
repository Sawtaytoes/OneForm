# useField\(\)

{% hint style="danger" %}
This hook is meant for writing **custom** `<Field />` components.

A better option is `useFieldData` which is designed for more generic use cases than `useField`.
{% endhint %}

`useField` is used by OneForm's `Field` component internally.

Unlike `useFieldData`, this hook is specifically designed for adding props to wrapped child components and comes with callbacks.

## Props

### Props in

| Prop Name | Description |
| :--- | :--- |
| `name` | The base field name without a `/`. |
| `onChange` | Called when the returned `valueChanged` is called. |
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

A common use case is creating your own `<Field />` component.

> Why though?

OneForm has opinions on how it names props passed to child components. If you want more control over this, then you'll need to create your own `<Field />` component.

Here's an example of a custom `<Field />` component:

{% tabs %}
{% tab title="CustomFieldExample.jsx" %}
```jsx
import { useField } from '@oneform/react';
import PropTypes from 'prop-types'
import {
  cloneElement,
  memo,
  useMemo,
} from 'react'

const CustomFieldExample = ({
  children,
}) => {
  const {
    errorMessages,
    fieldName,
    isChecked,
    isHtmlElement,
    isVisited,
    updateFieldValue,
    value,
    visitField,
  } = (
    useField({
      children,
    })
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

const MemoizedCustomField = memo(CustomFieldExample)

export default MemoizedCustomField
```
{% endtab %}

{% tab title="CustomFieldContainerExample.jsx" %}
```jsx

```
{% endtab %}
{% endtabs %}

