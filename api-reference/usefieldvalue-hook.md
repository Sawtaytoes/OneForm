# useFieldValue\(\)

Allows you to get and set values for any field.

{% hint style="info" %}
This hook is commonly used when showing or hiding fields based on their value.
{% endhint %}

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

