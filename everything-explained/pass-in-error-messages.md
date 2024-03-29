---
description: This typically happens when receiving error messages from an API request.
---

# Reset and replace error messages

By passing an **`errorMessages`** object to OneForm, you can **reset** all error messages ****and **replace** them ****with your own:

```jsx
import {
  FieldErrorMessage,
  OneForm,
} from '@oneform/react'

const errorMessages = {
  email: [
    'Email addresses require an `@` sign.',
    'Only `.org` domains are valid.'
  ],
  name: [
    'You need to enter a name.',
  ],
}

const ErrorMessagesExample = () => (
  <OneFormProvider
    errorMessages={errorMessages}
  >
    <div>
      <FieldErrorMessage name="name" />
    </div>
    
    <div>
      <FieldErrorMessage name="email" />
    </div>
  </OneFormProvider>
)

export default ErrorMessagesExample
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

### Merge or update error messages

Instead of resetting and replacing error messages, you may want to update them instead.

Use `updatedErrorMessages`:

{% page-ref page="add-or-update-error-messages.md" %}

## Custom error messages component

`FormErrorMessage` only shows a single error. If you want to show all error messages, the **`useFieldErrorMessages`** hook gives you the ability to write your own component.

You can output multiple field error messages like so:

```jsx
import { useFieldErrorMessages } from '@oneform/react'

const FieldErrorMessagesExample = ({
  name,
}) => {
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
      <div key={errorMessage}>
        {errorMessage}
      </div>
    ))
  )
}

export default FieldErrorMessagesExample
```

```jsx
import { OneForm } from "@oneform/react";

import FieldErrorMessagesExample from "./FieldErrorMessagesExample.jsx";

const errorMessages = {
  email: [
    "Email addresses require an `@` sign.",
    "Only `.org` domains are valid."
  ]
};

const CustomErrorMessagesExample = () => (
  <OneFormProvider errorMessages={errorMessages}>
    <FieldErrorMessagesExample name="email" />
  </OneFormProvider>
);

export default CustomErrorMessagesExample;
```

## When is this useful?

If you have an external API which returns error messages when someone fails to write to the database, this is the perfect example of when you'd want to wipe all form errors.

Another instance would be if you have no client-side validation and want to do everything server-side. At that point, it makes sense to always wipe OneForm's errors with whatever `errorMessages` object you've passed in.

