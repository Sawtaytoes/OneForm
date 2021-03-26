# &lt;OneForm /&gt;

For now, use this link:

{% page-ref page="../getting-started/oneform-in-a-nutshell.md" %}

🚧 Under Construction

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

If you're wondering how you can render loops of components that share the same names, now you're looking for `<FieldGroup />`.

### Grouping fields for validation

Use the `FieldGroup` component:

```jsx

```

While this component is helpful, it's actually not required. Instead, you could add these in manually as well:

```jsx

```

{% hint style="danger" %}
This isn't recommended nor officially supported.
{% endhint %}

While the order of these groups doesn't matter it's better to use the `FieldGroup` tooling provided as you could easily mess things up without it.

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

