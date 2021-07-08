# 0.7.0
_May 25th, 2021_

- 💥 _**BREAKING CHANGE**_ Renamed callback functions in `useField`.
- ✨ Set an `input`'s `checked` attribute if it has a `value` attribute.
- ✨ Added Subfield component for multiselect behavior.

# 0.6.2
_May 24th, 2021_

- 🐛 Fixed a bug where the radio button's value was changing.

# 0.6.1
_May 22nd, 2021_

- 🐛 Built prior to publishing so new radio button functionality is available to use.
- ✨ Added missing `Children.only` check to `Field`.

# 0.6.0
_May 22nd, 2021_

- ✨ Added ability for `Field` and `useField` to properly handle radio buttons (this functionality isn't working until `0.6.1`).

# 0.5.2
_April 5th, 2021_

- 🐛 Fixed a regression where `onSubmit` no longer passed fields.

# 0.5.1
_April 5th, 2021_

- ✨ Added `formChangeState` to `SubmitField`.
- ✨ Modified `formValidationState` to be all form `errorMessages`.
- 🐛 Fixed `SubmitField` requiring a `fallback` prop.

# 0.5.0
_April 5th, 2021_

- ✨ `Field` marks `select` and `multiselect` as visited on selection.
- ✨ `Field` correctly handles `multiselect` values as an array.
- ✨ `groups` and `groupsString` are now available in a `groupValidations`'s `getErrorMessages()` function. This allows getting IDs for `groupNames` values when returning error messages.

# 0.4.2
_April 5th, 2021_

- ✨ `SubmitField` disables itself when submitting.

# 0.4.1
_April 5th, 2021_

- ✨ `SubmitField` is now available for wrapping buttons. It gives information about the form's submission state; something previously not available.

# 0.4.0
_April 5th, 2021_

- ✨ 'useFieldRegistration' is now exported.
- ✨ 'useFieldVisitation' is now exported.
- ✨ 'useFormSubmission' is now exported.

# 0.3.2
_April 5th, 2021_

- 🐛 Subsequent values from `onChange` are now correctly being set as visited.
- 🐛 `updatedValues` is now correctly setting those values to visited.

# 0.3.1
_April 5th, 2021_

- 🐛 Fixed a bug where passing `values` caused all values to first get set to `undefined` and then given a new value if passed. Now, this is done in a single step, so it will only set to the values passed or `undefined`, not both.
- 🐛 Fixed a regression where returned `values` from `onChange` weren't modifying OneForm's state.
- 🐛 Fixed a bug where passing `errorMessages` would remove all other origins. Now it properly only clears the external origin of `errorMessages` and `updatedErrorMessages`.

# 0.3.0
_April 5th, 2021_

- ✨ `FieldValue` and `FieldErrorMessage` can now render `children` into `children`.
- ✨ `FieldValue` and `FieldErrorMessage` now optionally take a `fallback` and `getIsVisible` prop.
- ✨ Error messages now use the same signature as the return value from `groupValidations` meaning they can be `true`, a string, or an array of strings. The array no longer needs to contain valid values either. If passed `false`, `null`, or `undefined`, those error messages are skipped.
- ✨ `Field` now sets different props depending on if it's been given an HTML element or React component.
- 🐛 `Field` now sets `error` as a boolean rather than a string. This fixes errors in Material-UI's `TextInput`.
- 🐛 Fixed a bug where checkboxes weren't set to visited on mount which is required for validating against them. This was fixed by looking for a checkbox input or a component with "checkbox" in the name.

# 0.2.2
_March 29th, 2021_

- 🐛 Fixed a bug where multiple `groupValidations` that shared the same `fieldNames` and `groupNames` (in the same order) would have conflicts on which errors would show and which wouldn't show.

# 0.2.1
_March 29th, 2021_

- 📝 Added logo to README on npm.

# 0.2.0
_March 29th, 2021_

- 💥 API changes:
	+ `validations` now takes a `getIsValid` function rather than `validate`. This function now receives an object with a `values` prop.
	+ `groupValidations` takes a `getErrorMessages` function and the return value is now an `errorMessages` object, the same as you pass into `OneForm` with the only difference being you can return a string rather than an array of error messages.
- There were quite a few bugs with `groupValidations`. Those are fixed in this version.
	+ 🐛 There's currently one issue with `groupValidations`:
		* If you have two which take the exact same field names (and they share or both don't have `groupNames`, their errors will interfere with each other.
		* This will be fixed in a later update.
		* A workaround is to change the order of `fieldNames` and `groupNames` your validations.
- ♻️ The entire error message system has been completely rewritten from the ground up.
