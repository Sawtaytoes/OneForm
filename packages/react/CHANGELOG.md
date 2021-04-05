# 0.4.0
_April 5th, 2021_

- ✨ `SubmitField` is not available for wrapping buttons. It gives information about the form's submission state; something previously not available.
- ✨ Added 'useFieldRegistration' to exports.
- ✨ Added 'useFieldVisitation' to exports.
- ✨ Added 'useFormSubmission' to exports.

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
