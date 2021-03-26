# &lt;FieldGroup /&gt;

`<FieldGroup />` is a wrapper for groups of fields. This is primarily meant as a way to clean up the naming of dynamic fields.

```jsx
<OneForm>
  <FieldGroup
    id="1"
    name="addressId"
  >
    <Field>
      <input
        name="name"
      />
    </Field>
    
    <FieldGroup
      id="1"
      name="emailId"
    >
      <Field>
        <input
          name="email"
        />
      </Field>
    </FieldGroup>
    
    <FieldGroup
      id="2"
      name="emailId"
    >
      <Field>
        <input
          name="email"
        />
      </Field>
    </FieldGroup>
  </FieldGroup>
</OneForm>
```

When submitting a form, you'll even be able to get back both flattened values and nested values using these groups.

```jsx
// example
```

There's no limit to how many `<FieldGroup />` wrappers you use, how deeply you nest fields.

You can even have duplicate `FieldGroup` `id` props:

```jsx
<FieldGroup
  id="1"
  name="accountId"
>
  <Field>
    <input
      name="email"
    />
  </Field>
</FieldGroup>

<FieldGroup
  id="1"
  name="accountId"
>
  <Field>
    <input
      name="name"
    />
  </Field>
</FieldGroup>
```

{% page-ref page="../everything-explained/how-do-i-validate-groups-of-fields.md" %}

