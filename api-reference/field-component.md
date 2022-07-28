---
description: 'I''ve got no strings, to hold me down...'
---

# &lt;Field&gt;

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
  <OneFormProvider>
    <Field>
      <input name="email" />
    </Field>
  </OneFormProvider>
)

export default FieldExample
```

Or with Material UI's `TextField`:

{% hint style="warning" %}
Material UI does something weird with its props, so while it works fine with `Field`, it will throw errors in the console. To avoid those errors, we've added a `MaterialUiField` export.
{% endhint %}

```jsx
import {
  TextField
} from "@material-ui/core";
import {
  FieldErrorMessage,
  MaterialUiField,
  OneForm,
} from '@oneform/react'

const MaterialUiFieldExample = () => (
  <OneFormProvider>
    <MaterialUiField>
      <TextField
        helperText={
          <FieldErrorMessage name="message" />
        }
        label="Message"
        name="message"
      />
    </MaterialUiField>
  </OneFormProvider>
)

export default MaterialUiFieldExample
```

## Props

<table>
  <thead>
    <tr>
      <th style="text-align:left">Prop Name</th>
      <th style="text-align:left">Prop Type</th>
      <th style="text-align:left">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left"><code>children</code>
      </td>
      <td style="text-align:left">Node</td>
      <td style="text-align:left"><em>A single component.</em>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><code>isCheckboxElement</code>
      </td>
      <td style="text-align:left">Boolean</td>
      <td style="text-align:left"><em>Checkboxes have a slightly different syntax where the <code>checked</code> prop is changed.<br /></em>
        <br
        />This prop is <b>required </b>for many non-HTML.</td>
    </tr>
    <tr>
      <td style="text-align:left"><code>isMultiFieldElement</code>
      </td>
      <td style="text-align:left">Boolean</td>
      <td style="text-align:left">
        <p><em><code>&lt;select&gt;</code> elements with the <code>multiple</code> attribute function different to other inputs. This isn&apos;t commonly used today, but OneForm still supports it.</em>
        </p>
        <p>&lt;em&gt;&lt;/em&gt;</p>
        <p>This prop is <b>required</b> for non-HTML multi-selects.</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><code>translateProps</code>
      </td>
      <td style="text-align:left">Function</td>
      <td style="text-align:left">
        <p><em>Passes the returned props to <code>children</code> instead of the defaults.<br /></em>
        </p>
        <p><em>Provides render-props-like behavior in a memoizable callback function.</em>
        </p>
        <p>&lt;em&gt;&lt;/em&gt;</p>
        <p>Most projects may need to create their own <code>Field</code> component.
          This prop will be the easiest way of achieving that goal.</p>
      </td>
    </tr>
  </tbody>
</table>

## Child props

### Props taken from the child element

<table>
  <thead>
    <tr>
      <th style="text-align:left">Prop Name</th>
      <th style="text-align:left">Prop Type</th>
      <th style="text-align:left">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left"><code>name</code>  <b>[required]</b>
      </td>
      <td style="text-align:left">String</td>
      <td style="text-align:left"><em>The identifier used by OneForm&apos;s states.</em>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><code>onBlur</code>
      </td>
      <td style="text-align:left">Function</td>
      <td style="text-align:left"><em>If you pass this into your component, <code>Field</code> will wrap it and call it after it&apos;s done processing.</em>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><code>onChange</code>
      </td>
      <td style="text-align:left">Function</td>
      <td style="text-align:left"><em>If you pass this into your component, <code>Field</code> will wrap it and call it after it&apos;s done processing.</em>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><code>value</code>
      </td>
      <td style="text-align:left">String</td>
      <td style="text-align:left">
        <p><em>Only used for checkboxes and radio buttons.</em>
        </p>
        <p><b>Required</b> for radio buttons.</p>
      </td>
    </tr>
  </tbody>
</table>

### Props given to a child HTML element

`Field` passes different props if given an HTML element instead of component.

| Prop Name | Prop Type | Description |
| :--- | :--- | :--- |
| `checked` | Boolean | Used by checkboxes and radio buttons. |
| `data-error` | Boolean | Signals there's at least one error on the field. |
| `data-visited` | Boolean | Signals the field has been visited. |
| `name` | String | The field name **without** the `/`. |
| `onBlur` | Function | Callback expecting a standard `onBlur` event. |
| `onChange` | Function | Callback expecting a standard `onChange` event. |
| `value` | Any | Value of the given field name. |

### Props given to a child component

By default, `Field` passes a wide assortment of props. If these cause errors in your components \(like they did with Material UI\), then create a new `Field` variant for your project that passes the `translateProps` prop. This allows you to configure how you'd like to name and use these props.

A single project can have multiple `Field` variants if the need arises; although, the default `Field` component handles many use cases. Typically, you'll only need one variant, but if you have many input components written without unified prop naming, then custom field wrappers are invaluable.

Another benefit to having input wrappers like `Field` is they decouple your input components from OneForm.

| Prop Name | Prop Type | Description |
| :--- | :--- | :--- |
| `checked` | Boolean | Used by checkboxes and radio buttons. |
| `dirty` | Boolean | Signals the field has been visited. |
| `error` | Boolean | Denotes at least one error exists for this field name. |
| `errors` | Array\[String\] | An array of error message strings. |
| `errorMessages` | Array\[String\] | An array of error message strings. |
| `isChecked` | Boolean | Denotes a radio or checkbox is checked. |
| `isDirty` | Boolean | Signals the field has been visited. |
| `isTouched` | Boolean | Signals the field has been visited. |
| `isVisited` | Boolean | Signals the field has been visited. |
| `name` | String | The field name **without** the `/`. |
| `onBlur` | Function | Callback expecting a standard `onBlur` event. |
| `onChange` | Function | Callback expecting a standard `onChange` event. |
| `touched` | Boolean | Signals the field has been visited. |
| `value` | Any | Value of the given field name. |
| `visited` | Boolean | Signals the field has been visited. |

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

