# Why not React Hook Form?

_I'm gonna rag on React Hook Form, but that in no way makes it a horrible library or a poor choice of a library._

_The reason you choose a library is up to the needs of your team and your project. I would argue that OneForm is the one form library you need, but that's my opinion. You're free make these choices on your own ;\)._

### Introduction

React Hook Form is a huge competitor in the market of React form libraries today. Unlike Formik, with its complex render props, React Hook Form wanted to take a post-hooks view of what a form library should look like.

It's got some amazingly detailed documentation and a nice, unique magenta color scheme. I was surprised to see how popular it was considering I'd only ever heard of it when looking up alternatives to Formik.

### Hooks, but not React

The folks who made React Hook Form put a lot of work into making a React-specific form library, and while it _does_ use hooks and _does_ have React in the name, it actually doesn't use React at all. This is why I think they completely missed the mark.

To make a React form library, the next generation of libraries using hooks, you'd expect something different than passing a `ref` to each and every input field.

### The \`ref\` problem

I dunno if you've ever dealt with `React.forwardRef` yourself, but it's major pain in the butt and makes component logic difficult to follow. Passing refs to React components has always been a difficult way to do this, but React Hook Form takes it one step further and requires you edit all your hand-crafted input components to accept a `ref` prop, so it can set its own DOM listeners; completely avoiding any React code in the process.

While it's called React Hook Form, I think a better name is DOM Form as there's very little about it that has me thinking "yeah, this was built for React".

### I'll give it a win

One benefit of using refs is you gain more information about the underlying DOM elements; something OneForm doesn't know. For instance, OneForm doesn't need to know if you have a checkbox unless you want to validate it. On the other hand, React Hook Form can check the `type` on your `HTMLInputElement` and know exactly what it is.

Another cool thing in React Hook Form is it has this concept of field registration. That's actually the same concept I came up with in OneForm, and it ensures you're only submitting and validating registered fields. In React Hook Form, they're using it to keep track of which inputs they control. Similar concept, different implementation.

