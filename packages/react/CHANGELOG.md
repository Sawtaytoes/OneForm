# 1.10.0
_November 3, 2021_

- ✨ Added `useRegisteredFieldEffect` to allow registering a field on component mount. This is different from `useField` in that the intent is only to register. It prevents people from copy-pasting `useField` and placing it in other parts of the code. It's recommended to use `useRegisteredFieldEffect` in tandem with `useFieldValue` rather than `useField` to make your intent clear.

# 1.9.4
_November 2, 2021_

- 🐛 Fixed a subform's `updatedValues` overriding other field values because all `updatedValues` were being stored. Also fixed for `updatedErrorMessages`.

# 1.9.3
_November 2, 2021_

- 💩 Forgot to build before publishing in this version.

# 1.9.2
_September 14, 2021_

- 🐛 Fixed a bug where events could be `null` in non-standard `onChange` callbacks.

# 1.9.1
_September 12, 2021_

- 🐛 Fixed an edge-case bug where `0` and non-boolean values can be set for `isChecked` instead of a boolean inside of `useField`.
- 🔥 Removed the experimental `Subfield` and `useSubfield` files. `Field` took over this role in `1.3.0`.

# 1.9.0
_September 12, 2021_

- 🐛 Fixed a bug where `Field` didn't handle the use case of using both `isCheckbox` and `isMultiple`.
- 🔥 Removed the experimental `Subfield` and `useSubfield` files. `Field` took over this role in `1.3.0`.

# 1.8.2
_September 9, 2021_

- 🐛 Fixed a bug where the root onChange would stop working after updating.

# 1.8.1
_September 9, 2021_

- 🐛 Fixed a bug where symbol looping was incorrectly setup in the internal `useSymbolFunctionStore`.

# 1.8.0
_September 9, 2021_

- 🎉 Added TypeScript types!
- 🔥 Removed unnecessary `console.log` messages in `useSubformEffect`.

# 1.7.7
_September 6, 2021_

- 🐛 Fixed group validations not properly storing the previous error state.

# 1.7.6
_September 6, 2021_

- 🐛 Fixed validations not re-running when new validations passed.

# 1.7.5
_September 5, 2021_

- 🐛 Fixed error messages not marking fields as visited. Most people would never see this bug.

# 1.7.4
_September 1, 2021_

- 🐛 Fixed a bug where `onSubmit` wouldn't execute on `OneForm` if it was passed into `Subform`.

# 1.7.3
_August 30, 2021_

- 🐛 Changed `useLayoutEffect` to `useMemo` with a side-effect.

# 1.7.2
_August 30, 2021_

- 🐛 Fixed a bug where passing `updatedValues` or `values` both `OneForm` and `Subform` would only take the values in `Subform`.

# 1.7.1
_August 26, 2021_

- 🐛 Added missing `Subform` and `useSubformEffect` to the library export.

# 1.7.0
_August 26, 2021_

- ✨ Added `Subform` as a way of passing props to `OneForm` without returning them back up the chain.
- 🐛 Fixed a bug where OneForm would stop working if `groupValidations` received an updated value.

# 1.6.0
_August 24, 2021_

- ✨ Added `getErrorMessages` to `useFormSubmission`.
- ✨ Added `isVisited` to `useFormSubmission`.
- ✨ Added `submitForm` to `useFormSubmission`.

# 1.5.1
_August 18, 2021_

- ✨ Added a console error when `name` is `undefined`.
- 🐛 Fixed a bug where passing a non-object from `onChange` (instead of an input event) would cause an error.

# 1.5.0
_August 17, 2021_

- ✨ Improved tree-shaking by defining the library as side-effect free and not-bundling the ESM files.
- 🐛 Fixed an error which occurred when `onChange` doesn't receive a valid `InputEvent`.

# 1.4.0
_July 27, 2021_

- ✨ Added `IfFieldErrorMessage`.
- ✨ Added `IfFieldValue`.
- ✨ Added `IfFieldVisitation`.
- 🐛 Fixed a bug in OneForm where visitation state isn't set from `values` on first mount.

# 1.3.0
_July 27, 2021_

- ✨ Added multi-element support for checkboxes that share the same `name` prop.
- ✨ Unchecked string-value checkboxes are marked with the string `unchecked` instead of `false` per the HTML spec.

# 1.2.0
_July 26, 2021_

- ✨ Added `translateProps` prop to `Field`. This allows creating new `Field` components without relying on `useField`.
- ✨ Added `MaterialUiField`. This removes console errors from using `Field`.

# 1.1.1
_July 26, 2021_

- 🐛 Fixed a bug where isVisited was returning a string instead of a boolean.

# 1.1.0
_July 24, 2021_

- 💥 Separated boolean logic from `FieldValue` into `IfFieldValue`. This feature was never documented.
- 💥 Separated boolean logic from `FieldErrorMessage` into `IfFieldErrorMessage`. This feature was never documented.

# 1.0.3
_July 23, 2021_

- 🐛 Fixed a bug where initial checkbox values weren't set correctly.
- 🐛 Fixed a bug where checkboxes are switching between controlled and uncontrolled if they have undefined values.
- 🐛 Fixed the `Subfield` export importing `SubmitField.jsx`.

# 1.0.2
_July 22, 2021_

- 🐛 Fixed issue where some checkboxes wouldn't check because it was incorrectly passing the `value` prop rather than the `checked` or `isChecked` prop.

# 1.0.1
_July 22, 2021_

- 🏗️ Added `useIsCheckboxElement` to library export
- 🏗️ Added `useIsHtmlElement` to library export
- 🏗️ Added `Subfield` to library export
- 🏗️ Added `useSubfield` to library export

# 1.0.0
_July 21, 2021_

- 💥 Modified `useField` to take an object, not children.
- 💥 Modified `useFormSubmission` to take no args rather than children.
- 💥 Modified `useSubfield` to take an object, not children.

# 0.7.1
_July 21, 2021_

- ♻️ Minor refactor in `useIsHtmlElement`.

# 0.7.0
_May 25, 2021_

- 💥 _**BREAKING CHANGE**_ Renamed callback functions in `useField`.
- ✨ Set an `input`'s `checked` attribute if it has a `value` attribute.
- ✨ Added Subfield component for multiselect behavior.

# 0.6.2
_May 24, 2021_

- 🐛 Fixed a bug where the radio button's value was changing.

# 0.6.1
_May 22, 2021_

- 🐛 Built prior to publishing so new radio button functionality is available to use.
- ✨ Added missing `Children.only` check to `Field`.

# 0.6.0
_May 22, 2021_

- ✨ Added ability for `Field` and `useField` to properly handle radio buttons (this functionality isn't working until `0.6.1`).

# 0.5.2
_April 5, 2021_

- 🐛 Fixed a regression where `onSubmit` no longer passed fields.

# 0.5.1
_April 5, 2021_

- ✨ Added `formChangeState` to `SubmitField`.
- ✨ Modified `formValidationState` to be all form `errorMessages`.
- 🐛 Fixed `SubmitField` requiring a `fallback` prop.

# 0.5.0
_April 5, 2021_

- ✨ `Field` marks `select` and `multiselect` as visited on selection.
- ✨ `Field` correctly handles `multiselect` values as an array.
- ✨ `groups` and `groupsString` are now available in a `groupValidations`'s `getErrorMessages()` function. This allows getting IDs for `groupNames` values when returning error messages.

# 0.4.2
_April 5, 2021_

- ✨ `SubmitField` disables itself when submitting.

# 0.4.1
_April 5, 2021_

- ✨ `SubmitField` is now available for wrapping buttons. It gives information about the form's submission state; something previously not available.

# 0.4.0
_April 5, 2021_

- ✨ 'useFieldRegistration' is now exported.
- ✨ 'useFieldVisitation' is now exported.
- ✨ 'useFormSubmission' is now exported.

# 0.3.2
_April 5, 2021_

- 🐛 Subsequent values from `onChange` are now correctly being set as visited.
- 🐛 `updatedValues` is now correctly setting those values to visited.

# 0.3.1
_April 5, 2021_

- 🐛 Fixed a bug where passing `values` caused all values to first get set to `undefined` and then given a new value if passed. Now, this is done in a single step, so it will only set to the values passed or `undefined`, not both.
- 🐛 Fixed a regression where returned `values` from `onChange` weren't modifying OneForm's state.
- 🐛 Fixed a bug where passing `errorMessages` would remove all other origins. Now it properly only clears the external origin of `errorMessages` and `updatedErrorMessages`.

# 0.3.0
_April 5, 2021_

- ✨ `FieldValue` and `FieldErrorMessage` can now render `children` into `children`.
- ✨ `FieldValue` and `FieldErrorMessage` now optionally take a `fallback` and `getIsVisible` prop.
- ✨ Error messages now use the same signature as the return value from `groupValidations` meaning they can be `true`, a string, or an array of strings. The array no longer needs to contain valid values either. If passed `false`, `null`, or `undefined`, those error messages are skipped.
- ✨ `Field` now sets different props depending on if it's been given an HTML element or React component.
- 🐛 `Field` now sets `error` as a boolean rather than a string. This fixes errors in Material-UI's `TextInput`.
- 🐛 Fixed a bug where checkboxes weren't set to visited on mount which is required for validating against them. This was fixed by looking for a checkbox input or a component with "checkbox" in the name.

# 0.2.2
_March 29, 2021_

- 🐛 Fixed a bug where multiple `groupValidations` that shared the same `fieldNames` and `groupNames` (in the same order) would have conflicts on which errors would show and which wouldn't show.

# 0.2.1
_March 29, 2021_

- 📝 Added logo to README on npm.

# 0.2.0
_March 29, 2021_

- 💥 API changes:
  + `validations` now takes a `getIsValid` function rather than `validate`. This function now receives an object with a `values` prop.
  + `groupValidations` takes a `getErrorMessages` function and the return value is now an `errorMessages` object, the same as you pass into `OneForm` with the only difference being you can return a string rather than an array of error messages.
- There were quite a few bugs with `groupValidations`. Those are fixed in this version.
  + 🐛 There's currently one issue with `groupValidations`:
    * If you have two which take the exact same field names (and they share or both don't have `groupNames`, their errors will interfere with each other.
    * This will be fixed in a later update.
    * A workaround is to change the order of `fieldNames` and `groupNames` your validations.
- ♻️ The entire error message system has been completely rewritten from the ground up.
