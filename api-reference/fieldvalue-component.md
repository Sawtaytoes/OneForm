# &lt;FieldValue /&gt;

Displays the value for a given field name.

## Props

| Prop Name | Prop Type | Description |
| :--- | :--- | :--- |
| `name` | String | The base field name **without** a `/`. |


```jsx
import {
  FieldValue,
  OneForm,
} from '@oneform/react'

const values = {
  name: 'Kevin Ghadyani',
}

const ValuesExample = () => (
  <OneForm
    values={values}
  >
    <div>
      <FieldValue name="name" />
    </div>
  </OneForm>
)
```

### When to use?

Most components display values in `<Field />`, so this component useful if:

* Your inputs don't display values.
* You want to display the value of a field somewhere else in your app.

