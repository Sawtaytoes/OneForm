# useField\(\)

OneForm's `<Field />` comes with a lot of props to fit all components' needs, but there's no way it'll be suitable for every existing project.

That's where `useField` comes into play.

{% hint style="danger" %}
This hook is meant for writing **custom** `<Field />` components.

A better option might be `useFieldData` which is designed for generic unopinionated use cases.
{% endhint %}

`useField` is used by OneForm's `Field` component internally which allows you to build components using the exact same tooling in your own projects.

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

Here's an example of a slimmed down custom `<Field />` component:

{% tabs %}
{% tab title="CustomFieldExample.jsx" %}
```jsx
import { useField } from '@oneform/react';
import {
  Children,
  cloneElement,
  memo,
  useMemo,
} from 'react'

const CustomFieldExample = ({
  children,
  isCheckbox,
}) => {
  const {
    name,
    onBlur: onVisit,
    onChange,
    // Unless `children` is a radio button, the `value` prop should never be set.
    value: inputValue,
  } = (
    children
    .props
  )

  const {
    errorMessages,
    fieldName,
    isChecked,
    isVisited,
    updateFieldValue,
    value,
    visitField,
  } = (
    useField({
      inputValue,
      isCheckboxElement: isCheckbox,
      name,
      onChange,
      onVisit,
    })
  )

  const childProps = (
    useMemo(
      () => ({
        errorMessages,
        isChecked,
        isVisited,
        name: fieldName,
        onBlur: visitField,
        onChange: updateFieldValue,
        value,
      }),
      [
        errorMessages,
        fieldName,
        isChecked,
        isVisited,
        updateFieldValue,
        value,
        visitField,
      ],
    )
  )

  return (
    cloneElement(
      (
        Children
        .only(
          children
        )
      ),
      childProps,
    )
  )
}

const MemoizedCustomFieldExample = memo(CustomFieldExample)

export default MemoizedCustomFieldExample
```
{% endtab %}

{% tab title="CustomFieldContainerExample.jsx" %}
```jsx
import {
  OneForm,
} from '@oneform/react'

import CustomFieldExample from './CustomFieldExample.jsx'

const CustomFieldContainerExample = () => (
  <OneFormProvider>
    <CustomFieldExample>
      <input name="message" />
    </CustomFieldExample>
  </OneFormProvider>
)

export default CustomFieldContainerExample
```
{% endtab %}
{% endtabs %}

The actual `<Field />` component in OneForm is much more complex, but that's because it has more generic requirements. In general, you want to tier a custom `<Field />` component to your project's needs based on the component structure and props naming you want to do.

