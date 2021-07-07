# &lt;FieldErrorMessage /&gt;

Displays the first error message for a given field name.

```jsx
import {
  FieldErrorMessage,
  OneForm,
} from '@oneform/react'

const errorMessages = {
  name: [
    'You need to enter a name.',
  ],
}

const ErrorMessagesExample = () => (
  <OneForm
    errorMessages={errorMessages}
  >
    <div>
      <FieldErrorMessage name="name" />
    </div>
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
      <td style="text-align:left"><code>name</code>
      </td>
      <td style="text-align:left">
        <p>String</p>
        <p><em>The base field name without a `/`.</em></p>
      </td>
    </tr>
  </tbody>
</table>


### When to use?

Most components display error messages in `<Field />`, so this component useful if:

* Your inputs don't display error messages.
* You want to display a single error message error message for multiple fields.

