---
description: By passing group validations.
---

# How do I validate groups of fields?

Group validations utilize the `groupValidation` prop on `<OneForm />`. It's not often you'll need to validate groups of fields, but when you do, OneForm provides a powerful API.

## Validate field groups

```jsx
const groupValidations = [
  {
    fieldNames: [
      'firstName',
      'lastName',
    ],
    validate: ({
      values,
    }) => {
      if (
        values.firstName
        === values.lastName
      ) {
        return [
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

## Change vs Submit validation

Using the `validationType` prop \(passed into your `validate` function\), it's possible to perform a different validation on field changes versus form submission.

```jsx
const groupValidations = [
  {
    fieldNames: [
      'day',
      'month',
    ],
    validate: ({
      validationType,
      values,
    }) => {
      if (validationType === 'change') {
        return
      }
      
      if (
        validationType === 'submit'
        && values.month <= 12
        && values.day <= 31
      ) {
        return [
          {
            errorMessage: 'Your date is invalid.'
            fieldName: 'dateError',
          }
        ]
      }
    }
  },
]
```

A good example is when you might not want to show an error message about a date being incorrect until the form is submitted, when it really matters.

## Avoiding namespace conflicts

To avoid namespace conflicts, prefix your field names with the component name:

```jsx
const MyFieldComponent = () => (
  <div>
    <Field>
      <input name="MyFieldComponent.firstName" />
    </Field>
    
    <Field>
      <input name="MyFieldComponent.lastName" />
    </Field>
  </div>
)
```

{% hint style="info" %}
This is only recommended if you're packaging fields in separate components as it shouldn't matter otherwise.
{% endhint %}

If you're wondering how you can render loops of components that share the same names, now you're looking for `<FieldGroup />`, and this is all bundled into dynamic field validation.

