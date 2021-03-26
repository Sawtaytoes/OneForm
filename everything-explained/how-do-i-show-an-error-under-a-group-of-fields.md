---
description: When your fields aren't long enough for full-width errors.
---

# How do I show an error under a group of fields?

There are a few ways of setting up error messages under a group of fields, the concept revolves around setting an error message on a made-up field name; one that only used for displaying error messages.

### Displaying errors anywhere by passing them in

The simplest way is passing `errorMessages` into `<OneForm />` on a field that'll only be used for displaying error messages:

```jsx
const errorsMessages = {
  birthdayError: [
    'You can only have one birthday.',
  ],
}

const MyFormWithOneError = () => (
  <OneForm
    errorsMessages={errorsMessages}
  >
    <FieldErrorMessage name="birthdayError" />
  </OneForm>
)

// HTML Output
<form>
  You can only have one birthday.
</form>
```

You can also use `updatedErrorMessages` as well with the same structure as `errorMessages`. Which you choose depends on your needs. `errorMessages` wipes the error state before showing the errors you pass in whereas `updatedErrorMessages` merges your errors into the existing form, only overwriting the fields with new errors.

### Displaying errors anywhere with group validations

Instead of passing in error messages, you'd typically want to use `groupValidations` as you don't have to manage any external state.

It'll look something like this:

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

const MyFormWithErrors = () => (
  <OneForm
    groupValidations={groupValidations}
  >
    <div>
      <Field>
        <input name="month" />
      </Field>

      <Field>
        <input name="day" />
      </Field>
    </div>

    <div>
      <FieldErrorMessage name="dateError" />
    </div>
  </OneForm>
)

// HTML Output
<form>
  <div>
    <input name="month" />
    <input name="day" />
  </div>
  
  <div>
    You can only have one birthday.
  </div>
</form>
```

You can return error message on completely unrelated fields, and that's the power of OneForm's internal state management. It doesn't care if those are real fields or error fields, so long as there's an error there, it will show it.

`FieldErrorMessage` returns a string of text wherever you put it. This ensures you don't display errors on the `month` and `day` fields; neither of which is long enough to accommodate a full-width error message.

{% hint style="info" %}
Don't worry about clearing out these error messages. OneForm keeps track of all error messages output by each `validate` function and removes those errors if nothing comes back.

This does mean you need to return all error messages in `validate` each time they occur.
{% endhint %}

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

