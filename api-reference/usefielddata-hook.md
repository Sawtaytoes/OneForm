# useFieldData\(\)

A grab-all of **helper values and functions** to perform whatever actions you need.

If you're wanting to **do something custom**, you're in the right place. This is the simplest hook to use and is a great starting point.

{% hint style="warning" %}
You may wish to use `useFieldValue` or `useFieldErrorMessages` for better performance depending on your needs.

Like React's `useContext`hook, this hook forces your component to update anytime the value, visitation, or error messages update on a field.
{% endhint %}

### Props in

| Prop Name | Description |
| :--- | :--- |
| `name` | The base field name **without** a `/`. |

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
      <td style="text-align:left"><code>fieldName</code>
      </td>
      <td style="text-align:left">The OneForm field name with a <code>/</code>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><code>isVisited</code>
      </td>
      <td style="text-align:left">Boolean value representing the field&apos;s visited state.</td>
    </tr>
    <tr>
      <td style="text-align:left"><code>register</code>
      </td>
      <td style="text-align:left">
        <p>Function which registers your component.</p>
        <p><em>It returns an <code>unregister</code> function. Remember to clean when you&apos;re done.</em>
        </p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><code>setErrorMessages</code>
      </td>
      <td style="text-align:left">Function which sets error messages for this field.</td>
    </tr>
    <tr>
      <td style="text-align:left"><code>setValue</code>
      </td>
      <td style="text-align:left">Function which sets the value for this field.</td>
    </tr>
    <tr>
      <td style="text-align:left"><code>setVisited</code>
      </td>
      <td style="text-align:left">
        <p>Function which sets the field as visited.</p>
        <p><em>You cannot unvisit a field.</em>
        </p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><code>value</code>
      </td>
      <td style="text-align:left">Current field value.
        <br /><em>When changed, value is updated.</em>
      </td>
    </tr>
  </tbody>
</table>

## When to use?

Whenever you want to do something custom in OneForm related to a field, this hook is important.

{% hint style="info" %}
OneForm handles a ton of state for you, so hooks like this aren't required.
{% endhint %}

If you can find a good use case for this hook, [contact us](../getting-started/support.md) so we can update the docs.

### Creating a custom field component

If you want to create a custom `<Field />` component, look at `useField` instead:

{% page-ref page="usefield-hook.md" %}

