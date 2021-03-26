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

### Display errors on unregistered fields

It's possible to display errors on fields that only exist for displaying error messages.

```jsx
const errors = {
  name: [
    'You can only have one birthday.',
  ],
}

const MyFormWithOneError = () => (
  <OneForm>
    <FieldErrorMessage name="birthdayError" />
  </OneForm>
)

// HTML Output
<form>
  You can only have one birthday.
</form>
```

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

{% page-ref page="../how-to/how-do-i-validate-groups-of-fields.md" %}

{% page-ref page="../how-to/how-do-i-validate-dynamic-field-groups.md" %}

## `hasFieldChangeValidation`

```jsx
<OneForm hasFieldChangeValidation={false}>
  <Field name="message" />
</OneForm>
```

{% hint style="info" %}
This value is `true` by default.
{% endhint %}

This prop validates fields when their values are changing. Setting it to `false` only validates on form submission.

The only reason this value exists is because people are still writing requirements that forms only validate on submit.

There may be performance reasons for this; although, `validationType` is passed in each validation function to make that easier to manage on a per-field level without having to globally disable it in OneForm.

{% hint style="info" %}
Instant validation on field changes is almost always more useful to a user than having them blindly fix fields. Leave this `true` unless you know what you're doing.
{% endhint %}

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

