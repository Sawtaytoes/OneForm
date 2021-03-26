---
description: This typically happens when returning from an API request.
---

# How do I pass in error messages?

By simply passing an `errors` object into OneForm, you can clear our the form's current errors and replace them with your own:

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

const MyFormComponent = () => (
  <OneForm
    errors={errors}
  >
    <div>
      <FieldErrorMessage name="name" />
    </div>
    
    <div>
      <FieldErrorMessage name="email" />
    </div>
  </OneForm>
)

// HTML Output
<form>
  <div>
    Email addresses require an `@` sign.
  </div>
  <div>
    You need to enter a name.
  </div>
</form>
```

While `FormErrorMessage` only divvies out one error, you can use `useFieldErrorMessages` in a custom error message component and get all of them in an array, the same array you passed in.

That looks something like this:

```jsx
const MyCustomFieldErrorMessages = () => {
  const {
    errorMessages = [],
  } = (
    useFieldErrorMessages({
      name,
    })
  )
  
  return (
    errorMessages
    .map((
      errorMessage,
    ) => (
      <div class="error-message">
        {errorMessage}
      </div>
    ))
  )
}
```

\`\`

