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

## Error message fields

You can return error message on completely unrelated fields such as those which only display error messages:

```jsx
const groupValidations = [
  {
    fieldNames: [
      'day',
      'month',
    ],
    validate: ({
      values,
    }) => {
      if (
        values.month <= 12
        && values.day <= 31
      ) {
        return [
          {
            errorMessage: 'Your date is invalid.'
            fieldName: 'dateError',
          },
          {
            fieldName: 'month',
          },
          {
            fieldName: 'day',
          },
        ]
      }
    }
  },
]
```

This is possible because OneForm has the capability of storing error messages and values in fields regardless of their existence in your form. In this case, you'd have code like this displaying the `dateError` message:

```jsx
<FieldErrorMessage name="dateError" />
```

`FieldErrorMessage` returns a string of text wherever you put it. This ensures you don't display errors on the `month` and `day` fields; neither of which is long enough to accommodate a full-width error message.

## Triggering an error state without a message

Looking at our previous example, we're returning errors on `month` and `day`, but haven't put in a message:

```jsx
validate: ({
  values,
}) => {
  if (
    values.month <= 12
    && values.day <= 31
  ) {
    return [
      {
        errorMessage: 'Your date is invalid.'
        fieldName: 'dateError',
      },
      {
        fieldName: 'month',
      },
      {
        fieldName: 'day',
      },
    ]
  }
}
```

What's gonna happen next?

OneForm translates all `undefined` error messages as `' '`. If you didn't catch that, it's a space character. It does this because a space character translates to a truthy value. Useful when triggering the error state of a form without displaying an error message.

### Using a space character

The reason we use `' '` instead of `true` or any other value, most React components accept a single type of data in their fields.

Because of this, the value needs to be truthy without switching types from a string to a boolean. A space character, which HTML skips over, is important to achieving this goal.

{% hint style="warning" %}
While HTML will remove the space, you might have special styling in your custom components if an error message exists.  
  
In those cases, you'll need to ensure to `.trim()` the error message before checking if those styles should activate.
{% endhint %}

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

