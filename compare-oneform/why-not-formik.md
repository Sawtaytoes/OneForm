# Why not Formik?

I'm gonna rag on Formik, but that in no way makes it a horrible library or a poor choice of a library.

The reason you choose a library is up to the needs of your team and your project. I would argue that OneForm is the one form library you need, but that's my opinion. You're free make these choices on your own ;\).

### Introduction

Formik has a lot of neat features and likes to give you as many tools as you need to build forms. There's a reason it's hit the top spot, and that's because it's a solid enough framework to warrant the being number one.

Another reason it's at the top most-likely has to do with Redux Form being the only other major choice of a form library. With many articles coming out negative toward the entire basis of Redux Form \(using Redux to manage form state\),  Formik was there at the right time to fill the void as a React-only competitor.

When I saw Formik for the first time, I wondered how in the world _this_ is the library taking first place. Doesn't mean you're wrong for using it, but I was stunned we didn't have anything better considering the popularity of React and the universality of forms.

### Performance

Formik is primarily based on using render props. While the oldest version use a `withFormik` higher-order component, the latest versions is primarily written with render props.

Render props are a major performance bottleneck. You're creating new components everywhere as inline anonymous functions, and they can't be memoized. At scale, this would make Formik a bottleneck in your application.

### Complicated syntax

Formik reveals a lot of its internals and makes users figure out how to put it together.

Take this simpler example from their docs:

{% code title="formikField.js" %}
```jsx
<Field name="lastName">
  {({
    field, // { name, value, onChange, onBlur }
    form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    meta,
  }) => (
    <div>
      <input type="text" placeholder="Email" {...field} />
      {meta.touched && meta.error && (
        <div className="error">{meta.error}</div>
      )}
    </div>
  )}
</Field>
```
{% endcode %}

You have to manage so much yourself just to use `Field`. Why go through all that?

When we convert that same example to OneForm, this is what we see:

{% code title="oneFormField.js" %}
```jsx
<div>
  <Field>
    <input name="lastName" type="text" placeholder="Email" />

    <div className="error">
      <FieldErrorMessage name="lastName" />
    </div>
  </Field>
</div>
```
{% endcode %}

Which do you prefer?

### Render-props workarounds

Lastly, while Formik also has a `Field` component, instead of wrapping your existing components, `Field` takes all your props as well as a custom component, and that leaves you with less control.

Because of this, I've seen people create wrapper components for their inputs already wrapped with Formik's `Field` component. In no way should you need your input components controlled by a third-party library. That just makes it ridiculously difficult to move to another library in the future.

