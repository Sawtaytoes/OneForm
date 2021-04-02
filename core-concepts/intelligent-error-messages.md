# Intelligent error messages

The **error messaging system** in OneForm **tracks** each error message's **origin**.

There are three error message origins:

1. `updatedErrorMessages`
2. `groupValidations` \(further divided per group validation\)
3. `validations`

{% hint style="warning" %}
Currently, `errorMessages` wipes all error messages regardless of their origin.

This may change in a future update such that `errorMessages` and `updatedErrorMessages` share the same origin.
{% endhint %}

### The idea

* Error messages should stay put if nothing explicitly changes them.
* Error messages should be separately tracked to a specific validation, group validation, or passed-in error messages object.
* If a validation or group validation is removed, those error messages should also be removed.

This ends up making your error messages deterministic and very easy to follow. It also means you **won't** get into **race conditions** or **edge cases** where errors don't work like you expect.

### Arrays of Strings

Error messages are all stored as arrays of strings.

OneForm internally uses `' '`, a space character, to represent a truthy error message. This prevents boolean vs string conflicts.

{% hint style="info" %}
When doing something custom in OneForm, you may find yourself in a situation where you'll need to know about the space character.
{% endhint %}

### Preventing form submission

Active error messages prevents OneForm from calling you `onSubmit` callback. `onChange` will still run regardless.

