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
| `hasFieldChangeValidation` | Boolean |
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
      'day',
      'month',
    ],
    validate: ({
      validationType,
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
          }
        ]
      }
    }
  },
]
```

An array of objects containing a `validate` function that gets called when any subscribed value changes.

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

It's important to use FieldGroup instead of manually naming fields with group names:

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
     values,
    }) => {
      values
      .phoneNumber
      
      // Contains
      /*
        [
          {
            name: 'phoneNumber/phoneNumberId:2342134',
            value: '555-555-5555',
          },
          {
            name: 'phoneNumber/phoneNumberId:4787873',
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
      id="2342134"
      name="phoneNumberId"
    >
      <Field>
        <input name="phoneNumber" />
      </Field>
    </FieldGroup>

    <FieldGroup
      id="4787873"
      name="phoneNumberId"
    >
      <Field>
        <input name="phoneNumber" />
      </Field>
    </FieldGroup>
  </OneForm>
)
```



// Something about using `reverseLookup`.



### Performing validations on related groups of values

Using `groupNames`, it's possible to do a "GROUP BY" operation:

```jsx

```













## `validations`

```jsx
const validations = {
  email: [
    {
      errorMessage: 'Email addresses require an `@` sign.',
      getIsValid: (
        value,
      ) => (
        !(
          value
          .includes('@')
        )
      ),
    },
    {
      errorMessage: 'Only `.org` domains are valid.'
      getIsValid: (
        value,
      ) => (
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
      getIsValid: (
        value
      ) => (
        value
      )
  ],
}
```

We haven't changed `validate` to `getIsValid` yet.

