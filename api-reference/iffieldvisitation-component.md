# &lt;IfFieldVisitation&gt;

This component allows you to conditionally render based on a field being visited.

By default, fields are visited when blurred; unless they're checkboxes, then they're blurred by default.

{% hint style="info" %}
If you want to conditionally render based on the value of a checkbox, use `IfFieldValue` instead.
{% endhint %}

## Props

<table>
  <thead>
    <tr>
      <th style="text-align:left">Prop Name</th>
      <th style="text-align:left">Prop Type</th>
      <th style="text-align:left">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left"><code>children</code>
      </td>
      <td style="text-align:left">Node</td>
      <td style="text-align:left">Any number of components.</td>
    </tr>
    <tr>
      <td style="text-align:left"><code>fallback</code>
      </td>
      <td style="text-align:left">Node</td>
      <td style="text-align:left">
        <p>Fallback component that displays when.</p>
        <p><em>This <b>will </b>change in a future version</em>.</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left"><code>name</code>
      </td>
      <td style="text-align:left">String</td>
      <td style="text-align:left">The base field name <b>without</b> a <code>/</code>.</td>
    </tr>
  </tbody>
</table>

```jsx
import {
  IfFieldVisitation,
  OneForm,
} from '@oneform/react'

const ConditionalFieldVisitationExample = () => (
  <OneForm
    values={{
      firstName: '',
    }}
  >
    <div>
      <IfFieldVisitation name="firstName">
        That's a nice name.
      </IfFieldVisitation>
    </div>
  </OneForm>
)

export default ConditionalFieldVisitationExample 
```

### When to use?

This is probably most useful when:

* You have a flow of information and want to limit showing new fields until other fields have been visited.

