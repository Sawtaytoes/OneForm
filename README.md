# OneForm
The OneForm you need!

## Features
- No external dependencies (except React).
- Super clean API.
- Validation and group validation built-in.
- Write your own validations or use your favorite library.
- Works with both standard HTML elements and custom React components.
- Minuscule bundle size.
- Ridiculously fast. Built to never be a bottleneck.

## Installation
With `npm`:
```sh
npm install @oneform/react
```

Or with `yarn`:
```sh
yarn add @oneform/react
```

## Links

- Philosophy

## Quick Start

With OneForm, you don't need to worry about forms ever again. Not because it's the best form library out there, but because it doubles as a state manager. Yes, that means you could build an entire React app with OneForm! Now, you're playing with power!

Here's a simple example of OneForm in action:
```jsx
<OneForm>
	<Field>
		<input name="message" />
	</Field>
</OneForm>
```

No magic, it _just works_. Don't believe me? Here's a realistic example:

```jsx
import {
	Input,
} from '@material-ui/core'
import {
	Field,
	OneForm,
} from '@oneform/react'

<OneForm
	onSubmit={({
		registeredValues,
	}) => (
		// Do stuff, then tell OneForm you're done.
		Promise
		.resolve()
	)}
>
	<Field>
		<Input name="email" />
	</Field>
	<Field>
		<Input name="password" />
	</Field>
	<div>
		<button type="submit">
			Submit
		</button>
	</div>
</OneForm>
```

**OneForm handles everything for you.** Values, errors, messages, submit button disabling, `onChange` handlers, etc. Unlike other form libraries, you don't have to pass any special props to `Field`, just give it an input, and you're ready to go!

## Caveats
To use `Field`, there is a caveat. Your input component needs to have a `name` prop and it needs to accept a `value` prop. Even if it doesn't, no big deal, there's a field translation component which will customize `Field` for your particular components.

## Special Thanks
This project wasn't just something I came up with in a bubble. It was brought on by the fact I, and the others I worked with, wanted a better experience building complex forms.

These are the folks at Minted that played a big part in the creation of Minted Forms (which was _the_ inspiration for `OneForm`):

- Giselle Ghadyani
- Rebekah Heacock Jones
- Peter Carnesciali
- Everyone else at Minted!
