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

### Error message fields

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

### Triggering an error state without a message

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

The reason we use `' '` instead of `true` or any other value, most React components accept a single type of data in their fields.

Because of this, the value needs to be truthy without switching types from a string to a boolean. A space character, which HTML skips over, is important to achieving this goal.

{% hint style="warning" %}
While HTML will remove the space, you might have special styling in your custom components if an error message exists.  
  
In those cases, you'll need to ensure to `.trim()` the error message before checking if those styles should activate.
{% endhint %}

### Change vs Submit validation

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

### Avoiding namespace conflicts

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

### Grouping fields for validation

Before going into dynamic field validation, you need to first know how we group fields in OneForm. Wrap every grouped `<Field />` in `<FieldGroup />` like so:

```jsx
<FieldGroup
  id="b27b"
  name="addressId"
>
  <Field>
    <input name="name" />
  </Field>
  
  <Field>
    <input name="address" />
  </Field>
</FieldGroup>

<FieldGroup
  id="97ef"
  name="addressId"
>
  <Field>
    <input name="name" />
  </Field>
  
  <Field>
    <input name="address" />
  </Field>
</FieldGroup>

```

Under the hood, `FieldGroup` is adding special properties to the field name that look like this internally:

```jsx
{
  'name/addressId:b27b': '',
  'address/addressId:b27b': '',

  'name/addressId:97ef': '',
  'address/addressId:97ef': '',
}
```

Since OneForm contains a shallow object of all field values, it needs some way to uniquely identify all fields. It achieves this by having `FieldGroup` assign these unique properties to each field's name.

You can even deeply nest `FieldGroup` components:

```jsx
<FieldGroup
  id="97ef"
  name="addressId"
>
  <Field>
    <input name="name" />
  </Field>
  
  <Field>
    <input name="address" />
  </Field>
  
  <FieldGroup
    id="a6d1"
    name="emailId"
  >
    <Field>
      <input name="email" />
    </Field>
  </FieldGroup>
  
  <FieldGroup
    id="c232"
    name="emailId"
  >
    <Field>
      <input name="email" />
    </Field>
  </FieldGroup>
</FieldGroup>

// OneForm's internal state
/*
  {
    'name/addressId:97ef': '',
    'address/addressId:97ef': '',

    'email/addressId:97ef/emailId:a6d1': '',
    'email/addressId:97ef/emailId:c232': '',
  }
*/

```

Notice how both email fields share the same `addressId`, but not the same `emailId`. This allows us to validate against different groups of fields by "querying" these group IDs in a group validation.

While the `FieldGroup` component is helpful, it's actually not required. Before adding it, you'd need to add these names manually:

```jsx
<Field>
  <input name="name/addressId:97ef" />
</Field>

<Field>
  <input name="address/addressId:97ef" />
</Field>
```

{% hint style="danger" %}
This method isn't recommended nor is it officially supported.
{% endhint %}

It's important to use `FieldGroup` instead of manually naming fields with group names:

1. If you wind up misnaming one, it's a pain to fix as it'll likely be an edge-case in your app.
2. While the order you assemble groups doesn't matter, you still need to make sure each deeply-nested group has the parents' group names.
3. When grouping components into separate field-only components, you can wrap those in `FieldGroup` at the parent level, so you don't have to pass any props to child components. That way, field groups could either be groups or single-renders.

### Validating dynamic fields

It's possible to validate dynamic fields using only the field name.

By default, your `validate` callback will receive an array of any values wrapped in `<FieldGroup />`:

```jsx
const groupValidations = [
  {
    fieldNames: [
      'phoneNumber',
    ],
    validate: ({
      reverseLookup, // 🤔 What's this?
      values,
    }) => {
      // Inside `values.phoneNumber`
      /*
        [
          {
            name: 'phoneNumber/phoneNumberId:23a4',
            value: '555-555-5555',
          },
          {
            name: 'phoneNumber/phoneNumberId:478f',
            value: '012-345-6789',
          },
        ]
      */
    }
  },
]

const MyFormComponent = () => (
  <OneForm
    groupValidations={groupValidations}
  >
    <FieldGroup
      id="23a4"
      name="phoneNumberId"
    >
      <Field>
        <input name="phoneNumber" />
      </Field>
    </FieldGroup>

    <FieldGroup
      id="478f"
      name="phoneNumberId"
    >
      <Field>
        <input name="phoneNumber" />
      </Field>
    </FieldGroup>
  </OneForm>
)
```

### Performing validations on related groups of values

With dynamic fields, it's still possible you'll wanna validate individual fields instead  of groups of those fields. Similar to a `GROUP BY` operation in SQL, you can add `groupNames` to "query" fields into validation groups sent to `validate` based on their group names strings:

```jsx
const groupValidations = [
  {
    fieldNames: [
      'firstName',
      'lastName',
    ],
    groupNames: [
      'personId',
    ],
    validate: () => {},
  },
]
```

While it depends on how you grouped your fields, our example form can only have one of each first and last name per `personId`. Because of that, our `validate` function will get called for each change from any one of those grouping of fields.

As a user enters the first group of first and last name, `validate` will see values like this:

```jsx
{
  firstName: 'John',
  lastName: 'Smith',
}
```

When a user types in another set of first and last name fields, the `validate` callback gets these values:

```jsx
{
  firstName: 'Authur',
  lastName: 'Gernow',
}
```

How in the world do you know which group these fields came from? How do you go back to the original field name that OneForm's storing internally?

That's where `reverseLookup` comes into play. It looks something like this:

```jsx
{
  'firstName': 'firstName/personId:64e3',
  'lastName': 'lastName/personId:64e3',
}
```

> What do I do with it?

When returning error messages, you'll pull the field name from `reverseLookup.firstName` instead of using the `'firstName'` string.

```jsx
validate: ({
  reverseLookup,
  values,
}) => {
  if (
    values.firstName
    === values.lastName
  ) {
    return [
      {
        fieldName: (
          reverseLookup.firstName,
        ),
      },
      {
        errorMessage: (
          'Last name cannot match first name.'
        ),
        fieldName: (
          reverseLookup.lastName,
        ),
      },
    ]
  }
}
```

You're probably wondering why OneForm doesn't do this for you, I mean, it knows the field names of what went in, it should also know what's going out and translate those for you.

Thin about it like this. Each `personId` might have a single first and last name, but it could also contain multiple `phoneNumber` or `email` fields. How in the world would OneForm know which fields are erroring if all you gave back was `email`?

Instead of having 2 ways of returning errors, if you have field groups, you'll need to use `reverseLookup` to be on the safe side.

Using `reverseLookup` will also mean your validations can be deterministic and won't rely on OneForm's magic behind the scenes. It's one of those places where being explicit provides more value than trying to be helpful.

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

