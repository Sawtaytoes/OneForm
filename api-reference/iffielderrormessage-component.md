# &lt;IfFieldErrorMessage&gt;

This component allows you to conditionally render based on the existence of a field error message.

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
      <td style="text-align:left"><code>getIsVisible</code>
      </td>
      <td style="text-align:left">Function</td>
      <td style="text-align:left">Callback function that gives you the <code>value</code> and lets you customize
        when the contents should or should not be visible.</td>
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
  FieldErrorMessage,
  IfFieldErrorMessage,
  OneForm,
} from '@oneform/react'

const ConditionalFieldErrorMessageExample = () => (
  <OneFormProvider
    errorMessages={{
      firstName: ['You need a name'],
    }}
  >
    <div>
      <IfFieldErrorMessage name="firstName">
        <small>
          <FieldErrorMessage name="firstName" />
        </small>
      </IfFieldErrorMessage >
    </div>
  </OneFormProvider>
)

export default ConditionalFieldErrorMessageExample 
```

### When to use?

This component will probably be used often if you have separate error components.

Some notable uses:

* You want to show a `<FieldErrorMessage>`, but have it wrapped in some styled elements, so you only want to show it when an error message exists.
* You want to show instructions when a field has errored.

