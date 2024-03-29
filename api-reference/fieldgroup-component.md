# &lt;FieldGroup&gt;

A wrapper for wrapping dynamic fields.

{% hint style="danger" %}
It's recommended to use `<FieldGroup />` to wrap any and all dynamic fields.
{% endhint %}

Field groups affect what's output from `onSubmit` and how `validations` and `groupValidations` listen for field updates.

```jsx
import {
  Field,
  FieldGroup,
  OneForm,
} from '@oneform/react'

const FieldGroupExample = () => (
  <OneFormProvider>
    <FieldGroup
      id="1"
      name="addressId"
    >
      <Field>
        <input name="name" />
      </Field>
    </FieldGroup>
  </OneFormProvider>
)

export default FieldGroupExample
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
      <td style="text-align:left">Any number of components.</td>
    </tr>
    <tr>
      <td style="text-align:left"> <code>id</code>
      </td>
      <td style="text-align:left">String</td>
      <td style="text-align:left">
        <p>A unique identifier for this group.</p>
        <p><em>It only has to be unique for the given group name.</em>
        </p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"> <code>name</code>
      </td>
      <td style="text-align:left">String</td>
      <td style="text-align:left">The group name.</td>
    </tr>
  </tbody>
</table>

### Versatility

There's no limit to how many `<FieldGroup />` wrappers you use, how deeply you nest fields.

You can even have duplicate `id` props!:

```jsx
import {
  Field,
  FieldGroup,
  OneForm,
} from '@oneform/react'

const SharedFieldGroupIdExample = () => (
  <OneFormProvider>
    <FieldGroup
      id="1"
      name="accountId"
    >
      <Field>
        <input name="email" />
      </Field>
      
      <Field>
        <input name="name" />
      </Field>
    </FieldGroup>
  </OneFormProvider>
)

export default SharedFieldGroupIdExample
```

### Deeply nesting dynamic fields

```jsx
import {
  Field,
  FieldGroup,
  OneForm,
} from '@oneform/react'

const BasicDeeplyNestedFieldGroupsExample = () => (
  <OneFormProvider>
    <FieldGroup
      id="1"
      name="addressId"
    >
      <Field>
        <input name="name" />
      </Field>

      <FieldGroup
        id="1"
        name="emailId"
      >
        <Field>
          <input name="email" />
        </Field>
      </FieldGroup>

      <FieldGroup
        id="2"
        name="emailId"
      >
        <Field>
          <input name="email" />
        </Field>
      </FieldGroup>
    </FieldGroup>
  </OneFormProvider>
)

export default BasicDeeplyNestedFieldGroupsExample
```

### Form submission

When submitting a form, you'll get back flattened values.

In this form:

```jsx
import {
  Field,
  FieldGroup,
  OneForm,
} from '@oneform/react'
import {
  useCallback,
} from 'react'

const FieldGroupSubmissionExample = () => {
  const formSubmitted = (
    useCallback(
      ({
        registeredValues,
      }) => {
        console.log(
          registeredValues
        )
      },
      [], 
    )
  )

  return (
    <OneFormProvider
      onSubmit={formSubmitted}
    >
      <FieldGroup
        id="1"
        name="addressId"
      >
        <Field>
          <input name="name" />
        </Field>
      </FieldGroup>
    </OneFormProvider>
  )
}

export default FieldGroupSubmissionExample
```

`console.log` will log this object:

```jsx
{
  'name/addressId:1': '',
}
```

{% page-ref page="../everything-explained/validate-groups-of-fields.md" %}

{% page-ref page="../everything-explained/validate-dynamic-groups-of-fields.md" %}

