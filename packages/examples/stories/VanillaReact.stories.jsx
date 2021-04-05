/* eslint-disable react/prop-types */
import {
	Field,
	FieldErrorMessage,
	// FieldValue,
	OneForm,
} from '@oneform/react'
import {
	action,
} from '@storybook/addon-actions'
import {
	useCallback,
	useState,
} from 'react'

import VanillaReactStyles from './VanillaReactStyles.jsx'

export default {
	args: {
		onChange: action(),
		onSubmit: action(),
	},
	argTypes: {
		onChange: 'changed',
		onSubmit: 'submitted',
	},
	title: 'Vanilla React',
}

export const Registration = (
	args,
) => {
	const [
		submittedValues,
		setSubmittedValues,
	] = (
		useState()
	)

	const formSubmitted = (
		useCallback(
			({
				registeredValues,
			}) => {
				args
				.onSubmit(
					registeredValues
				)

				return (
					new Promise((
						resolve,
					) => {
						setTimeout(
							resolve,
							1000,
						)
					})
					.then(() => {
						setSubmittedValues(
							registeredValues
						)
					})
				)
			},
			[
				args,
			],
		)
	)

	return (
		<OneForm
			{...args}
			onSubmit={formSubmitted}
		>
			<VanillaReactStyles />

			<div>
				<label>
					<Field>
						<input
							name="username"
						/>
					</Field>
				</label>

				<div>
					<FieldErrorMessage
						name="username"
					/>
				</div>
			</div>

			<div>
				<label>
					<Field>
						<input
							name="password"
							type="password"
						/>
					</Field>
				</label>

				<div>
					<FieldErrorMessage
						name="password"
					/>
				</div>
			</div>

			<div>
				<button
					type="submit"
				>
					Submit
				</button>
			</div>

			{
				submittedValues
				&& (
					<pre>
						{
							JSON
							.stringify(
								submittedValues,
								null,
								2,
							)
						}
					</pre>
				)
			}
		</OneForm>
	)
}

Registration
.args = {
	validations: {
		password: [
			{
				errorMessage: 'You must enter a password.',
				getIsValid: ({
					value,
				}) => (
					value
				),
			},
		],
		username: [
			{
				errorMessage: 'You must enter a username.',
				getIsValid: ({
					value,
				}) => (
					value
				),
			},
			{
				errorMessage: 'Username must be longer than 6 characters.',
				getIsValid: ({
					value,
				}) => (
					(
						value
						?.length
					)
					> 0
				),
			},
		],
	},
}
