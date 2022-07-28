# &lt;FieldErrorMessage&gt;

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

const BasicErrorMessagesExample = () => (
  <OneFormProvider
    errorMessages={errorMessages}
  >
    <div>
      <FieldErrorMessage name="name" />
    </div>
  </OneFormProvider>
)

export default BasicErrorMessagesExample
```

## Props

| Prop Name | Prop Type | Description |
| :--- | :--- | :--- |
| `name` | String | _The base field name without a \`/\`._ |

### When to use?

Most components display error messages in `<Field />`, so this component useful if:

* Your inputs don't display error messages.
* You want to display a single error message error message for multiple fields.

