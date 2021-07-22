# Basic Example

Here's a simple example of OneForm in action:

```jsx
import {
  Field,
  OneForm,
} from '@oneform/react'

const BasicExample = () => (
  <OneForm>
    <Field>
      <input name="message" />
    </Field>
  </OneForm>
)

export default BasicExample
```

It's a pretty basic example, but you don't need to pass anything special to `OneForm`, just `children`.  
  
`Field` is where the magic happens. All of your props go on your input components, `Field` will try its best to read your props.

### Caveats

To use `Field`, there is a caveat. Your input component needs to have a `name` prop and it needs to accept a `value` prop. Even if it doesn't, no big deal, there's a field translation component which will customize `Field` for your particular components.

