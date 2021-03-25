---
description: A state management library disguised as a form library.
---

# State first

OneForm is actually a state management library. That's what makes it so powerful and why it provides a seemless experience as a form library.

### Store any value

You can store _any_ value in a field. While these are typically strings because you're dealing with `input` elements, you can put whatever you want in there and even validate those custom data types!

### Replace \`useState\` with \`onChange\`

Obviously, custom data types in your field values won't work with form fields as those only work with strings. But **who says every field needs to render on the page?**

The `onChange` handler lets you return a new state, this is important because, based on field X changing, you might also update the value of an internal-only field.

In OneForm, fields are just segments of state where you're storing data. That means they can be anything. While they're identified by a string, you could simply change the state of a `"cellA1.calculation"` field and know you won't have a namespace conflict with other fields also storing custom state.

That's the beauty of this system.

### An app without React state?

If you want to replace all your `useState` and `useEffect` calls with `Field` and `onChange`, it's actually possible. Your entire app could be written without any React hooks because OneForm would provide the wrapper for your state.

The best part about this is that sub-states can be managed by wrapping that section in another `OneForm` component. Since it's React context under-the-hood, all of OneForm's components will look to its closest `OneForm` parent for state.

