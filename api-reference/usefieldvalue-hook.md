# useFieldValue\(\)

Allows you to get and set values for any field.

{% hint style="info" %}
This hook is commonly used when showing or hiding fields based on their value.
{% endhint %}

## Props

### Props in

| Prop Name | Description |
| :--- | :--- |
| `name` | The base field name **without** a `/`. |

### Props out

| Prop Name | Description |
| :--- | :--- |
| `setValue` | Function which sets the value for this field. |
| `value` | Current field value. _When changed, value is updated._ |

## When to use?

At the moment, OneForm doesn't allow you to render or not render a field based on its value. For now, this hook is required for those use cases.

You can even use it to display a list of notifications which disappear after 5 seconds:

{% tabs %}
{% tab title="NotificationsExample.jsx" %}
```javascript
import { useFieldValue } from '@oneform/react';
import {
  memo,
  useEffect,
} from 'react'

const NotificationsExample = () => {
  const {
    setValue,
    value = [],
  } = (
    useFieldValue({
      // `name` doesn't exist on an `input`. It's made for this component.
      name: 'notifications',
    })
  )
  
  useEffect(
    () => {
      if (value.length === 0) {
        return
      }
      
      const timeoutId = (
        setTimeout(
          () => {
            setValue(
              []
            )
          },
          5000,
        )
      )
      
      return () => {
        clearTimeout(
          timeoutId
        )
      }
    },
    [
      setValue,
      value,
    ],
  )

  return (
    <div>
      <h2>
        Notifications
      </h2>
    
      <ul>
        {
          value
          .map((
            notification,
          ) => (
            <li>
              {notification}
            </li>
          ))
        }
      </ul>
    </div>
  )
}

const MemoizedNotificationsExample = memo(NotificationsExample)

export default MemoizedNotificationsExample
```
{% endtab %}

{% tab title="NotificationsContainerExample.jsx" %}
```
import { OneForm } from "@oneform/react";

import NotificationsExample from "./NotificationsExample.jsx";

const values = {
  notifications: [
    'You have something I want.',
    'I think this is exactly what I\'m looking for',
  ]
}

const NotificationsContainerExample = () => (
  <OneForm values={values}>
    <NotificationsExample />
  </OneForm>
);

export default NotificationsContainerExample;

```
{% endtab %}
{% endtabs %}

