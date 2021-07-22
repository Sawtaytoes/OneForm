---
description: 'The center of everything, the one and only, OneForm.'
---

# &lt;OneForm /&gt;

## Props

| Prop Name | Prop Type | Description |
| :--- | :--- | :--- |
| `children` | Node |  |
| `errorMessages` | Object |  |
| `groupValidations` | Array |  |
| `hasFieldChangeValidation` | Boolean | Default value \(`true`\) |
| `onChange` | Function |  |
| `onSubmit` | Function |  |
| `updatedErrorMessages` | Object |  |
| `updatedValues` | Object |  |
| `validations` | Object |  |
| `values` | Object |  |

## `children`

```jsx
import {
  Field,
  FieldErrorMessage,
  OneForm,
} from '@oneform/react'

const PassingChildrenExample = () => (
  <OneForm>
    Text or React components can appear in here.

    <label htmlFor="message">
      <Field>
        <input
          id="message"
          name="message"
        />
      </Field>
    </label>

    <div>
      <FieldErrorMessage name="message" />
    </div>
  </OneForm>
)

export default PassingChildrenExample
```

Can be any valid React element \(example: single or multiple components and text\).

`OneForm` provides no render props to children; therefore, you shouldn't pass in an anonymous function.

{% hint style="info" %}
This is the only required prop in OneForm.

Without it, OneForm would only render an HTML `<form />` and provide literally no other.
{% endhint %}

## `errorMessages`

```jsx
const errorMessages = {
  email: [
    'Email addresses require an `@` sign.',
    'Only `.org` domains are valid.'
  ],
  name: [
    'You need to enter a name.',
  ],
}
```

This is an object where each prop contains an array of strings where the strings are error messages tied to specific fields.

{% hint style="warning" %}
Updating this value will wipe all errors from the form and only display the ones you passed in.

If you want to merge new errors into OneForm, use `updatedErrorMessages` instead.
{% endhint %}

These exports have access to error messages defined by `errorMessages`:

* `Field`
* `FieldErrorMessage`
* `useField`
* `useFieldErrorMessages`

{% page-ref page="../everything-explained/pass-in-error-messages.md" %}

{% page-ref page="../everything-explained/show-an-error-message-under-a-group-of-fields.md" %}

## `groupValidations`

```jsx
const groupValidations = [
  {
    fieldNames: [
      'firstName',
      'lastName',
    ],
    getErrorMessages: ({
      reverseLookup, // Needed for dynamic fields.
      validationType, // Either 'change' or 'submit'.
      values, // Only contains fields from `fieldNames` ^^.
    }) => {
      if (
        values.firstName
        === values.lastName
      ) {
        // Returning `undefined` and `[]` are also fine.
        return {
            // Changes this to `' '` behind the scenes for signifying an error state.
          firstName: true,
          // An error message on the `lastName` field.
          lastName: 'Your first and last name cannot match.',
        ]
      }
    }
  },
]
```

An array of objects containing a `getErrorMessages` function that gets called when any subscribed value changes.

When returning a value, instead of returning a boolean, you need to specify which fields actually errored and the message for each of those fields. In the _above_ example, we returned an error message on only the `lastName` field.

{% page-ref page="../everything-explained/validate-groups-of-fields.md" %}

{% page-ref page="../everything-explained/validate-dynamic-groups-of-fields.md" %}

{% page-ref page="../everything-explained/only-validate-on-submit.md" %}

## `hasFieldChangeValidation`

```jsx
import {
  Field,
  OneForm,
} from '@oneform/react'

const ChangeValidationExample = () => (
  <OneForm hasFieldChangeValidation={false}>
    <Field name="message" />
  </OneForm>
)

export default ChangeValidationExample
```

{% hint style="info" %}
This value is `true` by default.
{% endhint %}

{% page-ref page="../everything-explained/only-validate-on-submit.md" %}

## `onChange`

```jsx
import {
  Field,
  OneForm,
} from '@oneform/react'
import {
  useCallback,
  useState,
} from 'react'

const ShowWithCheckboxExample = () => {
  const [
    hasNickname,
    setHasNickname,
  ] = (
    useState(
      false
    )
  )

  const formChanged = (
    useCallback(
      ({
        fieldName,
        value,
        values, // Contains all field values.
      }) => {
        if (fieldName === 'nickname') {
          setHasNickname(
            value
          )
        }
      }
    )
  )

  return (
    <OneForm
      onChange={formChanged}
    >
      {
        hasNickname
        && (
          <div>
            <Field>
              <input name="nickname" />
            </Field>
          </div>
        )
      }
    </OneForm>
  )
}

export default ShowWithCheckboxExample
```

Pass in a callback function to `onChange`, and it'll be called anytime a field changes.

This will give you:

| Prop Name | Description |
| :--- | :--- |
| `fieldName` | Name of the field that changed. |
| `value` | Value of the field that changed. |
| `values` | All field values in a shallow object. |

{% hint style="info" %}
Returning a values object from `onChange` let's you update the value of any field in the form.

For example, this can be used to update the value of a domain name from `.com` to `.org` when selecting from a dropdown.
{% endhint %}

## `onSubmit`

```jsx
import {
  Field,
  OneForm,
} from '@oneform/react'

const formSubmitted = (
  useCallback(
    ({
      allValues,
      registeredValues,
    }) => {
      // do stuff
    },
    [],
  )
)

const SubmittingFormExample = () => (
  <OneForm
    onSubmit={formSubmitted}
  >
    <Field>
      <input name="message" />
    </Field>
  </OneForm>
)

export default SubmittingFormExample
```

Pass a callback to `onSubmit` and receive:

<table>
  <thead>
    <tr>
      <th style="text-align:left">Prop Name</th>
      <th style="text-align:left">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left"><code>allValues</code>
      </td>
      <td style="text-align:left">Every field that&apos;s ever had a value.
        <br />
        <br />This is not what you want unless you have <b>multipart forms</b>.</td>
    </tr>
    <tr>
      <td style="text-align:left"><code>registeredValues</code>
      </td>
      <td style="text-align:left">
        <p>An object only containing fields that are registered. This almost always
          means fields which are currently mounted.</p>
        <p>This is the value <b>most will want</b>.</p>
      </td>
    </tr>
  </tbody>
</table>

## `updatedErrorMessages`

```jsx
const updatedErrorMessages  = {
  email: [
    'Email addresses require an `@` sign.',
    'Only `.org` domains are valid.'
  ],
  name: [
    'You need to enter a name.',
  ],
}
```

This is an object where each prop contains an array of strings where the strings are error messages tied to specific fields.

{% hint style="warning" %}
Updating this value will only overwrite previous error message keys if you pass them to `updatedErrorMessages`.

If you want to replace all errors, use `errorMessages` instead.
{% endhint %}

These exports have access to error messages defined by `updatedErrorMessages`:

* `Field`
* `FieldErrorMessage`
* `useField`
* `useFieldErrorMessages`

{% page-ref page="../everything-explained/add-or-update-error-messages.md" %}

## `updatedValues`

```jsx
const updatedValues = {
  email: 'john.smith@test.com',
}
```

An object of field name keys and string values.

{% hint style="info" %}
You can use any value, it **doesn't have to be a string**, but if you want to display the value in any HTML input field, it **needs to be a** **string**.
{% endhint %}

`updatedValues` is great when **receiving async or realtime data**.

This prop is extremely important if you're using `onChange` to save to your database and need to return any changed or updated values back to OneForm.

{% hint style="warning" %}
If you're wanting to **update field values synchronously**, like changing the `.com` to `.org` in a domain name, you'll want to use `onChange` instead.
{% endhint %}

{% hint style="warning" %}
If you want to **initialize values** in your form, it might be better to use `values` instead.
{% endhint %}

## `validations`

```jsx
const validations = {
  email: [
    {
      errorMessage: 'Email addresses require an `@` sign.',
      getIsValid: ({
        value,
      }) => (
        !(
          value
          .includes('@')
        )
      ),
    },
    {
      errorMessage: 'Only `.org` domains are valid.'
      getIsValid: ({
        value,
      }) => (
        value
        .test(
          /^.+\.org$/
        )
      ),
    },
  ],
  name: [
    {
      errorMessage: 'You need to enter a name.',
      getIsValid: ({
        value,
      }) => (
        value
      )
  ],
}
```

An object field names. `getIsValid` is called **whenever that field changes**.

The `errorMessage` is set whenever `getIsValid` returns `false`. When it's set to `true`, the `errorMessage` is removed.

It's also possible to configure your form to validate only on submit:

{% page-ref page="../everything-explained/only-validate-on-submit.md" %}

## `values`

```jsx
const values = {
  email: 'john.smith@test.com',
  name: 'John Smith',
}
```

An object of field name keys and string values.

{% hint style="info" %}
You can use any value, it **doesn't have to be a string**, but if you want to display the value in any HTML input field, it **needs to be a** **string**.
{% endhint %}

`values` overwrites all values in OneForm with this new object. This is typically named **initial values**.

OneForm lets you pass changes to `values` as many times as you want.

### Resetting form values

To reset all form values after submitting successfully, just pass `{}` to values:

```jsx
const values = {}
```

