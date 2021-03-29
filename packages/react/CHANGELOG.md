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
