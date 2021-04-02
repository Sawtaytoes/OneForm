# Introduction

## What is OneForm?

OneForm is a form library.

> Okay... So what's that mean to me?

OneForm is a way to manage the state of your form. Instead of home-rolling that kinda stuff, let OneForm handle it.

Everyone uses forms, and it's expensive to write this same stuff again and again every time you wanna do something simple. And if you wanna do something complex, well, you're probably reading this because you've already gone too far \(it's okay, I know how you feel\).

Unlike other popular form libraries, OneForm doesn't require setting up anything special. Just wrap your input components in `<Field />` and be on your way.

### What does OneForm solve?

I built OneForm to solve the problem if maintaining form state in React. There are plenty of competitors, big ones which hundreds of thousands of users:

* Formik
* React Hook Form
* Redux Form
* React Final Form

Even amongst these hulking competitors, OneForm was designed to be _the_ solution to form state in React; the "one form" library you need!

### Who needs OneForm?

Everyone. Even for simple forms with a single select box and a button, I recommend OneForm. Even if you don't need to submit your form, I recommend OneForm.

If your form is extremely complex and has multiple dynamic fields and those dynamic fields render dynamic fields and you also need to some how maintain validation that queries the values of multiple fields, OneForm is most-definitely the **only** solution I'd recommend.

And if you need to build an application, and you want to use a state manager that's not Redux or MobX, use OneForm. Yes, it's completely possible. I think you'll be surprised at how easy it can be. While OneForm primarily a form library, it's also a powerful state manager.

## Special Thanks

While I wrote `OneForm`, this project wasn't just something I came up with in a bubble. This library came about from a need at Minted to have highly-customizable complex forms.

These are the folks at Minted that played a big part in the creation of Minted Forms \(the inspiration for `OneForm`\):

* Giselle Ghadyani
* Rebekah Heacock Jones
* Peter Carnesciali
* Everyone else at Minted!

### The logo is important too!

The logo and title are courtesy of **Noah Raskin**. He does some amazing graphic design and even creates custom icon libraries! Talk about dedication to small details!

While this logo looks simple, there's a lot going on behind the scenes, and the way he shaded it amazed me as much as the cleanliness of OneForm's API.

![Credit: Noah Raskin](.gitbook/assets/oneform-cube-textdark%20%282%29%20%282%29%20%282%29.png)

