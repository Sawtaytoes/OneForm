---
description: 'I''ve got no strings, to hold me down...'
---

# &lt;Field /&gt;

Use this when wrapping HTML input components or your own custom input components.

It will pass them props such as change handlers, the current field value, and error messages.

{% hint style="warning" %}
`<Field />` does **not** use render props. It clones your child component instead.
{% endhint %}

With a standard HTML `input`:

```jsx
import {
  Field,
  OneForm,
} from '@oneform/react'

const FieldExample = () => (
  <OneForm>
    <Field>
      <input name="email" />
    </Field>
  </OneForm>
)
```

Or with Material UI's `TextField`:

```jsx
import {
  TextField
} from "@material-ui/core";
import {
  Field,
  FieldErrorMessage,
  OneForm,
} from '@oneform/react'

const FieldExample = () => (
  <OneForm>
    <Field>
      <TextField
        helperText={
          <FieldErrorMessage name="message" />
        }
        label="Message"
        name="message"
      />
    </Field>
  </OneForm>
)
```

## Props

<table>
  <thead>
    <tr>
      <th style="text-align:left">Prop Name</th>
      <th style="text-align:left">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left"><code>children</code>
      </td>
      <td style="text-align:left">
        <p>Node</p>
        <p>A single component.</p>
      </td>
    </tr>
  </tbody>
</table>

## Child props

### Props on the child component

| Prop Name | Description |
| :--- | :--- |
| name | A single component. |

If you add `onBlur` and `onChange` functions, they'll work as before, but they'll be wrapped by `<Field />`.

### Props given to the child component

| Prop Name | Description |
| :--- | :--- |
| `dirty` | An HTML-safe string representation of a boolean. |
| `error` | An error message string of the first error message. _This may change to a boolean in the future._ |
| `errors` | An array of error messages. |
| `name` | The field name **without** the `/`. |
| `onBlur` | Callback expecting a standard `onBlur` event. |
| `onChange` | Callback expecting a standard `onChange` event. |
| `touched` | An HTML-safe string representation of a boolean. |
| `value` | Value of the given field name. |
| `visited` | An HTML-safe string representation of a boolean. |

## Caveats

{% hint style="info" %}
Your input can be any component, but it absolutely needs a `name` prop. `Field` can't work without it.
{% endhint %}

You need to also have component at least needs these props to update the value:

* `onChange`
* `value`

Without these props, your custom input won't receive updates from OneForm.

To get around this limitation, you can create your own `<Field />` component with `useField`.

{% page-ref page="usefield-hook.md" %}

## Password fields

In the event you want a text box that doesn't show any text, I you could leave off the `value` prop 👍.

## Checkbox Validation Issue

OneForm supports checkbox fields no problem, except when you want to validate using a checkbox.

The way it works today, if you check a checkbox, it's considered "visited".

If you want to **validate without first checking the checkbox**, you'd have to create your own `<CheckboxField />` component using `useField`.

{% hint style="warning" %}
Your custom field component needs to call `setVisited` when the component mounts.
{% endhint %}

{% page-ref page="usefield-hook.md" %}

