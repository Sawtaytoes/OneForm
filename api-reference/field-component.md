---
description: 'I''ve got no strings, to hold me down...'
---

# &lt;Field /&gt;

`Field` is the most magical of components ever conceived in the _mystical world of React_. Not only does it require no props, but it leaves your code feeling fresh and clean. It's only as intrusive as it needs to be to accomplish its tasks of maintaining the state of whatever child component you give it.

## But really

The only required prop is `children`; more like "child". You give it a single input, it takes that input pulls off the `name` and passes it a `value`. From there, you're component's now hooked into OneForm's state.

```jsx
<Field>
  <input name="message" />
</Field>
```

It doesn't get any simpler than that.

## Caveats

In the rare case you need to validate fields relative to the value of a checkbox on change instead of submit, [tweet me](https://twitter.com/Sawtaytoes), and I'll figure it out for you. I plan to fix this, but haven't implemented one yet.

