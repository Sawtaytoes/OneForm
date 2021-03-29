---
description: Pass group validations with group names.
---

# Validate dynamic groups of fields

## Grouping fields for validation

Before going into dynamic field validation, you need to first know how we group fields in OneForm. Wrap every grouped `<Field />` in `<FieldGroup />` like so:

```jsx
<FieldGroup
  id="b27b"
  name="addressId"
>
  <Field>
    <input name="name" />
  </Field>
  
  <Field>
    <input name="address" />
  </Field>
</FieldGroup>

<FieldGroup
  id="97ef"
  name="addressId"
>
  <Field>
    <input name="name" />
  </Field>
  
  <Field>
    <input name="address" />
  </Field>
</FieldGroup>

```

Under the hood, `FieldGroup` is adding special properties to the field name that look like this internally:

```jsx
{
  'name/addressId:b27b': '',
  'address/addressId:b27b': '',

  'name/addressId:97ef': '',
  'address/addressId:97ef': '',
}
```

Since OneForm contains a shallow object of all field values, it needs some way to uniquely identify all fields. It achieves this by having `FieldGroup` assign these unique properties to each field's name.

### Deeply nesting field groups

You can even deeply nest `FieldGroup` components:

```jsx
<FieldGroup
  id="97ef"
  name="addressId"
>
  <Field>
    <input name="name" />
  </Field>
  
  <Field>
    <input name="address" />
  </Field>
  
  <FieldGroup
    id="a6d1"
    name="emailId"
  >
    <Field>
      <input name="email" />
    </Field>
  </FieldGroup>
  
  <FieldGroup
    id="c232"
    name="emailId"
  >
    <Field>
      <input name="email" />
    </Field>
  </FieldGroup>
</FieldGroup>

// OneForm's internal state
/*
  {
    'name/addressId:97ef': '',
    'address/addressId:97ef': '',

    'email/addressId:97ef/emailId:a6d1': '',
    'email/addressId:97ef/emailId:c232': '',
  }
*/

```

Notice how both email fields share the same `addressId`, but not the same `emailId`. This allows us to validate against different groups of fields by "querying" these group IDs in a group validation.

While the `FieldGroup` component is helpful, it's actually not required. Before adding it, you'd need to add these names manually:

```jsx
<Field>
  <input name="name/addressId:97ef" />
</Field>

<Field>
  <input name="address/addressId:97ef" />
</Field>
```

{% hint style="danger" %}
This method isn't recommended nor is it officially supported.
{% endhint %}

It's important to use `FieldGroup` instead of manually naming fields with group names:

1. If you wind up misnaming one, it's a pain to fix as it'll likely be an edge-case in your app.
2. While the order you assemble groups doesn't matter, you still need to make sure each deeply-nested group has the parents' group names.
3. When grouping components into separate field-only components, you can wrap those in `FieldGroup` at the parent level, so you don't have to pass any props to child components. That way, field groups could either be groups or single-renders.

## Validating dynamic fields

Dynamic fields are validated using only the field name.

By default, your `validate` callback will receive an array of any values wrapped in `<FieldGroup />`:

```jsx
const groupValidations = [
  {
    fieldNames: [
      'phoneNumber',
    ],
    getErrorMessages: ({
      reverseLookup, // 🤔 What's this?
      values,
    }) => {
      // Inside `values.phoneNumber`
      /*
        [
          {
            name: 'phoneNumber/phoneNumberId:23a4',
            value: '555-555-5555',
          },
          {
            name: 'phoneNumber/phoneNumberId:478f',
            value: '012-345-6789',
          },
        ]
      */
    }
  },
]

const MyFormComponent = () => (
  <OneForm
    groupValidations={groupValidations}
  >
    <FieldGroup
      id="23a4"
      name="phoneNumberId"
    >
      <Field>
        <input name="phoneNumber" />
      </Field>
    </FieldGroup>

    <FieldGroup
      id="478f"
      name="phoneNumberId"
    >
      <Field>
        <input name="phoneNumber" />
      </Field>
    </FieldGroup>
  </OneForm>
)
```

## Performing validations on related groups of values

With dynamic fields, it's still possible you'll wanna validate individual fields instead  of groups of those fields. Similar to a `GROUP BY` operation in SQL, you can add `groupNames` to "query" fields into validation groups sent to `validate` based on their group names strings:

```jsx
const groupValidations = [
  {
    fieldNames: [
      'firstName',
      'lastName',
    ],
    groupNames: [
      'personId',
    ],
    getErrorMessages: () => {},
  },
]
```

While it depends on how you grouped your fields, our example form can only have one of each first and last name per `personId`. Because of that, our `validate` function will get called for each change from any one of those grouping of fields.

As a user enters the first group of first and last name, `validate` will see values like this:

```jsx
{
  firstName: 'John',
  lastName: 'Smith',
}
```

When a user types in another set of first and last name fields, the `validate` callback gets these values:

```jsx
{
  firstName: 'Authur',
  lastName: 'Gernow',
}
```

How in the world do you know which group these fields came from? How do you go back to the original field name that OneForm's storing internally?

### Getting the original field names

That's where `reverseLookup` comes into play. It looks something like this:

```jsx
{
  'firstName': 'firstName/personId:64e3',
  'lastName': 'lastName/personId:64e3',
}
```

> What do I do with it?

When returning error messages, you'll pull the field name from `reverseLookup.firstName` instead of using the `'firstName'` string.

```jsx
getErrorMessages: ({
  reverseLookup,
  values,
}) => {
  if (
    values.firstName
    === values.lastName
  ) {
    return {
      [reverseLookup.firstName]: true,
      [reverseLookup.lastName]: (
        'Last name cannot match first name.'
      ),
    }
  }
}
```

### Instead of magic errors, OneForm prefers being explicit

You're probably wondering why OneForm doesn't do this for you, I mean, it knows the field names of what went in, it should also know what's going out and translate those for you.

Think about it like this. Each `personId` might have a single first and last name, but it could also contain multiple `phoneNumber` or `email` fields. How would OneForm know which fields are erroring if all `validate` returned was an error on `email`?

{% hint style="info" %}
Instead of having 2 ways of naming fields when returning errors, OneForm keeps it explicit thanks to `reverseLookup`.
{% endhint %}

Using `reverseLookup` will also mean your validations can be deterministic and won't rely on OneForm's magic behind the scenes. It's one of those places where being explicit provides more value than trying to be helpful.

