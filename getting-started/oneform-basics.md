# OneForm basics

The simplest way to use it is with an `input` and `Field` component:

```jsx
import {
  Field,
  OneForm,
} from '@oneform/react'

const BasicExample = () => (
  <OneForm>
    <Field>
      <input name="message" />
    </Field>
  </OneForm>
)
```

OneForm's `Field` component can take any input element or a React component.

## Watching field values

Looking at this example, the text underneath the input updates as you type.

```jsx
import {
  Field,
  OneForm,
} from '@oneform/react'

const UpdatingValueExample = () => (
  <OneForm>
    <div>
      <Field>
        <input name="message" />
      </Field>
    </div>
    
    <div>
      <FieldValue name="message" />
    </div>
  </OneForm>
)
```

{% embed url="https://codesandbox.io/embed/oneform-basics-react-llton?fontsize=14&hidenavigation=1&theme=dark" %}

## A few simple props

### Submitting the form

While submitting the form is optional, you could easily add a button to handle submission without having to pass in anything fancy.

To catch the submission, just pass an `onSubmit`:

```javascript
onSubmit={({
  allValues,
  registeredValues,
}) => (
  fetch(
    '/api/submit-form',
    {
      body: (
        JSON.stringify(
          registeredValues
        )
      ),
      method: 'POST',
    },
  )
)}
```

If you have a promise, you can return it to OneForm, and it will mark the submission state as `'pendingSubmission'` during that time period. This is useful if you have buttons that need disabling.

{% page-ref page="../api-reference/submitfield-component.md" %}

### Loading OneForm with values

If you wanted to load in some values yourself, just pass in `values`:

```javascript
values={{
  message1: 'Hello',
  message2: 'World!'
}}
```

### Displaying server-side error messages

You can even control error messages in much the same way using `errorMessages`:

```javascript
errorMessages={{
  message: [
    'This is an error'
  ],
}}
```

Passing in errors is useful if you're doing server-side validation, and your API returns an error on something your client-side validations didn't catch.

{% page-ref page="../everything-explained/add-or-update-error-messages.md" %}

### Merging in updated values and error messages

If you update `errorMessages` or `values`, doing so will overwrite the entire form state with your new values. If you want to update those values over time, like if you're waiting on an async error to come back, you'll need to pass `updatedErrorMessages` and `updatedValues` instead:

```javascript
updatedErrorMessages={{
  message: [
    'This is an error that was added by an async check.'
  ],
}}
updatedValues={{
  message: 'This is my updated value.',
}}
```

Passing in errors is useful if you're doing server-side validation, and your API returns an error on something your client-side validations didn't catch.

