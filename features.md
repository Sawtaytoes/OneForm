---
description: What makes OneForm stand out?
---

# Features

* No external dependencies \(except React\).
* Super clean API.
* Validation and group validation built-in.
* Write your own validations or use your favorite library.
* Works with both standard HTML elements and custom React components.
* Minuscule bundle size.
* Ridiculously fast. Built to never be a bottleneck.

## No external dependencies

With the exception of Redux Form, today's popular form libraries have no external dependencies. While it seems like a benefit, it's par-for-the-course.

## Super clean API

This is true \(my opinion, but it's subjectively-objective :p\).

Unlike other popular form libraries \(Formik, React Hook Form, Redux Form, React Final Form\), OneForm has it made when talking about a clean approach to solving the problem of forms in React. The solution is 100% built for React. No render-props, no refs, and no Redux.

It's clean even talking about validation, error handling, and updating values, and anything else you can think up.

## Validation and group validation is built-in

Not only are validation and group validation built in, but they're ridiculously powerful. While you statically define validations, they still work with dynamic fields, and you don't need to be aware of anything but the base field name.

You're **not** limited to a regex either. For field validation, make a function, put whatever you want in there, and return `true` or `false`.

Even when written against dynamic fields, you're going to find group validations very easy to write. I think of group validations like making JOIN statements in a database. While the API is super clean, it's extremely powerful behind the scenes. You can validate against all fields of a specific name like checking to make sure no two people share the same email address or validate all the birthdays for a single user and make sure they only have one :0.

## Write your own validations or use your favorite library

While Yup is extremely popular, it controls your entire validation cycle. OneForm does that for you, so instead, pass your Yup functions to OneForm and let it do it's thing. It's _that_ powerful.

## Works with both HTML and React

OneForm's trusty `Field` component is pretty dumb. It doesn't know or care if you're giving it a regular ol' HTML `input` or a super stylistic React component. All it cares is that your you have a `name` prop and accept a `value` prop. From there, sky's the limit.  
  
There are a couple other components, `FieldValue` and `FieldErrorMessage`, which listen to OneForm's state and return you text. That's text, not HTML. Take that text and put it anywhere, in a `label` prop, at the top of your form, in a button, in a warning message, etc.

## Minuscule bundle size

Since it's all written in-house, and since it only uses React tech, the bundle's really small. How small? That's specific to what you use, tree-shaking 'n all. There's nothing crazy that'd make it larger than any other form library.

## Ridiculously fast. Built to never be a bottleneck.

From the ground up, this thing's been built for speed. Unless you know what you're doing, React's Context API can be a huge bottleneck when you have lots of listeners. Many other libraries get this wrong, but OneForm does it right.

React Hook Form talks about the limited number of renders; that's because it doesn't use React. OneForm both uses React _and_ has the same minimal number of renders.

It's able to accomplish this through the use of **observables**; nothing huge like RxJS, just a small file that returns a `publish` and `subscribe` method. With those methods, I'm able to circumvent the problems of React's Context API the same way as Recoil with a significantly smaller footprint.

