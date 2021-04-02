# useFieldErrorMessage\(\)

Allows you to get and set error messages for any field.

{% hint style="info" %}
This hook is commonly used when creating custom error message components that display more than a single error message.
{% endhint %}

### Props in

| Prop Name | Description |
| :--- | :--- |
| `name` | The base field name without a `/`. |

### Props out

<table>
  <thead>
    <tr>
      <th style="text-align:left">Prop Name</th>
      <th style="text-align:left">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left"><code>errorMessages</code>
      </td>
      <td style="text-align:left">
        <p>Array of error message strings.</p>
        <p><em>When changed, this value is updated.</em>
        </p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><code>setErrorMessages</code>
      </td>
      <td style="text-align:left">Function which sets error messages for this field.</td>
    </tr>
  </tbody>
</table>

## When to use?

At the moment, OneForm doesn't allow you to render or not render a field based on its error messages. So for now, this hook is required for those use cases.

### Displaying multiple error messages

Another common use case would be creating your own `<FieldErrorMessages />` component which displays more than a single field error.

OneForm doesn't natively have a component for this because it has no clue how to style your error messages. For example, the `<FieldErrorMessage />` component only returns text.

