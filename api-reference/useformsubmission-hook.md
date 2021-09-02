# useFormSubmission\(\)

## Props

### Props in

<table>
  <thead>
    <tr>
      <th style="text-align:left">Prop Name</th>
      <th style="text-align:left">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left"><code>requiredFields</code>
      </td>
      <td style="text-align:left">
        <p>An optional array of field names to be checked when looking for visited
          fields.</p>
        <p>If not passed, it will default to using registered fields.</p>
      </td>
    </tr>
  </tbody>
</table>

### Props out

| Prop Name | Description |
| :--- | :--- |
| `formChangeState` | Either `'unchanged'`, `'staged'`, or `'committed'`. |
| `getErrorMessages` | Function that returns an array of all error messages on the form. |
| `isValid` | Boolean value representing no invalid fields. |
| `isVisited` | Boolean value representing all registered or optionally required fields being visited. |
| `isSubmitting` | Boolean value representing if the form is submitting. |
| `submitForm` | A programmatic function to submit the form rather than using a regular `"submit"` type. |
| `submissionState` | String value of the submission state. |
| `totalErrorMessages` | Number of error messages. |

## When to use?

When you want more control over the actual behavior of the form itself.

Typically, you're only working at the field-level. `useFormSubmission` gives you access to form-level state.

