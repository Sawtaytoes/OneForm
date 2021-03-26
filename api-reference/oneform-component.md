---
description: 'The center of everything, the one and only, OneForm.'
---

# &lt;OneForm /&gt;

## Props

| Prop Name | Required Type |
| :--- | :--- |
| `children` | Node |
| `errorMessages` | Object |
| `groupValidations` | Array |
| `hasFieldChangeValidation` | Boolean \(`true`\) |
| `onChange` | Function |
| `onSubmit` | Function |
| `updatedErrorMessages` | Object |
| `updatedValues` | Object |
| `validations` | Object |
| `values` | Object |

## `children`

```jsx
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
```

Can be any valid React element \(example: single or multiple components and text\).

`OneForm` provides no render props to children; therefore, you shouldn't pass in an anonymous function.

{% hint style="info" %}
This is the only required prop in OneForm.

Without it, OneForm would only render an HTML `<form />` and provide literally no other.
{% endhint %}

## `errorMessages`

```jsx
const errors = {
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

`Field` and `FieldErrorMessage` components, as well as the `useField` and `useFieldErrorMessages` hooks have access to error messages defined by this prop.

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
    validate: ({
      reverseLookup, // Needed for dynamic fields.
      validationType, // Either 'change' or 'submit'.
      values, // Only contains fields from `fieldNames` ^^.
    }) => {
      if (
        values.firstName
        === values.lastName
      ) {
        // Returning `undefined` and `[]` are also fine.
        return [
          // An optional error message on a single field.
          {
            errorMessage: 'Your first and last name cannot match.'
            fieldName: 'lastName',
          },
        ]
      }
    }
  },
]
```

An array of objects containing a `validate` function that gets called when any subscribed value changes.

When returning a value, instead of returning a boolean, you need to specify which fields actually errored and the message for each of those fields. In the _above_ example, we returned an error message on only the `lastName` field.

{% page-ref page="../everything-explained/validate-groups-of-fields.md" %}

{% page-ref page="../everything-explained/validate-dynamic-field-groups.md" %}

## `hasFieldChangeValidation`

```jsx
<OneForm hasFieldChangeValidation={false}>
  <Field name="message" />
</OneForm>
```

{% hint style="info" %}
This value is `true` by default.
{% endhint %}

{% page-ref page="../everything-explained/only-validate-on-submit.md" %}

## `onChange`

🚧 Under Construction

## `onSubmit`

```jsx
const formSubmitted = (
  useCallback(({
    allValues,
    registeredValues,
  }) => {
    // ...
  },
  [],
);

<OneForm
  onSubmit={formSubmitted}
>
  <Field>
    <input name="message" />
  </Field>
</OneForm>

```

🚧 Under Construction

## `updatedErrorMessages`

🚧 Under Construction

## `updatedValues`

🚧 Under Construction

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

We haven't changed `validate` to `getIsValid` yet.

🚧 Under Construction

## `values`

🚧 Under Construction

