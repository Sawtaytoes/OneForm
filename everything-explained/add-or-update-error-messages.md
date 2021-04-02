# Add or update error messages

Pass **`updatedErrorMessages`** to add error messages to specific fields. Unlike passing `errorMessages`, this **merges error messages** into the form instead of wiping all existing error messages:

```jsx
import {
  FieldErrorMessage,
  OneForm,
} from '@oneform/react'

const updatedErrorMessages = {
  email: [
    'Email addresses require an `@` sign.',
    'Only `.org` domains are valid.'
  ],
  name: [
    'You need to enter a name.',
  ],
}

const UpdatingErrorMessagesExample = () => (
  <OneForm
    updatedErrorMessages={updatedErrorMessages}
  >
    <div>
      <FieldErrorMessage name="name" />
    </div>
    
    <div>
      <FieldErrorMessage name="email" />
    </div>
  </OneForm>
)
```

The **HTML output** looks like:

```markup
<form>
  <div>
    Email addresses require an `@` sign.
  </div>
  <div>
    You need to enter a name.
  </div>
</form>
```

## Error messaging system

The error messaging system in OneForm tracks each error message's origin. This means passing `updatedErrorMessages` will not overwrite errors from `validations` and `groupValidations`. 

The idea is that, if you're passing in error messages on a field, you're in control of those particular error messages. If other error messages are there, they should stay there.

### Adding error messages

Thus, if you pass:

```jsx
updatedErrorMessages={{
  email: [
    'This email address is already taken.'
  ]
}}
```

And then later pass:

```jsx
updatedErrorMessages={{
  name: [
    'Your name uses invalid characters.'
  ]
}}
```

The **internal** error messages will look like:

```jsx
{
  email: [
    'This email address is already taken.'
  ],
  name: [
    'Your name uses invalid characters.',
  ],
}
```

### Overwriting error messages

Although, if you pass `updatedErrorMessages` again on `email`, it will overwrite the old ones:

```jsx
updatedErrorMessages={{
  email: [
    'You forgot an `@` sign.'
  ]
}}
```

This is what **internal** error messages looks like now:

```jsx
{
  email: [
    'You forgot an `@` sign.'
  ],
  name: [
    'Your name uses invalid characters.',
  ],
}
```

### Reset and replace error messages

If you want to replace all error messages anytime they're updated, use `errorMessages` instead:

{% page-ref page="pass-in-error-messages.md" %}

## When is this useful?

When dealing with an **asynchronous validation**, you can't rely on OneForm's synchronous validation check. These error messages need to be controlled outside the form.

An example would be validating the existence of a user account or domain name.

### Too much boilerplate

OneForm currently assumes async validation is rare.

If you run into this situation more than a few times, it'd be better if we implemented it natively in OneForm.

**Contact us directly**, and we'll prioritize this feature. It's on the todo list, but currently not implemented.

{% page-ref page="../getting-started/support.md" %}



