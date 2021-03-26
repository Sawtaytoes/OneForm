---
description: A word from the author.
---

# Philosophy

## Why make a new form library?

Forms are the basis of most applications, especially web apps. I've written quite a few forms in my day and usually kept them pretty simple; although, I'd have to write everything from scratch each time aside from when I'm working with a CMS.

I personally have had 3 years of fairly complex experience working with Redux-Form and wanted to find a better solution. An all-React solution sounded great provided it could handle things like validation and updating the display of fields based on the values of other fields.

### Please not Redux-Form again

While I didn't want to use Redux-Form again, I didn't like the two other popular form libraries \(at the time\) either: Formik and React Final Form.

Today, Formik does a lot more, but it still requires a ton of effort from the user. If you wanna do anything complex, I personally find Formik really difficult to follow. On top of that, the docs were \(and may still be\) pretty bare-bones.

### Form state should be simple

Formik exposes a ton of state which it makes you manage from inside the form. I believe a form library should be clean and manage the state of the form without your intervention. The only time you should be dealing with the library's internal form state is when you're submitting the form. This premise is how I came up with OneForm's API.

Even if you used React, the form still outputs regular old HTML. When looking at an HTML form, you implicitly know the state is handled elsewhere which makes it super easy to understand and maintain. If you could match your JSX to the HTML output, that's the golden ticket to a clean form API.

With the exception of React-Hook-Form, Most popular form libraries require you write your components in a way that works around their API. This means you'll need to tightly couple your form components to that library.

## How it works

OneForm hides as much of the form state as possible but also gives you an insane amount of freedom. And it also provides easy-to-use methods of hooking into that state. You don't have to be a OneForm expert to use it; although, it's so powerful, I was even able to build a simple spreadsheet application in just a few hours using OneForm.

When interacting with OneForm's state through components like `Field`, `FieldValue`, and `FieldErrorMessage`, it will feel like magic. While I personally don't like magic, the library and docs are very straight-forward about how it works.

The trick to the clean syntax of `Field` has to do with how it uses `React.cloneElement` to both capture the `name` field and render your component with new props \(specifically `value`\). Since just about every custom `Input` or `Select` component will have these props, there's little you have to do to make this work for you.

