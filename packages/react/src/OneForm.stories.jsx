import { action } from '@storybook/addon-actions'

import Field from './Field.jsx'
import FieldErrorMessage from './FieldErrorMessage.jsx'
import FieldValue from './FieldValue.jsx'
import OneForm from './OneForm.jsx'

export default {
	args: {
		onChange: action(),
		onSubmit: action(),
	},
	argTypes: {
		onChange: 'changed',
		onSubmit: 'submitted',
	},
	component: OneForm,
	title: 'OneForm',
}

export const SimpleHTMLInput = (
	args,
) => (
	<OneForm {...args}>
		<div>
			<Field>
				<input name="message" />
			</Field>
		</div>

		<div>
			<FieldValue name="message" />
		</div>
	</OneForm>
)

/* eslint-disable react/prop-types */
const Input = ({
	name,
	onChange,
}) => (
	<input
		name={name}
		onChange={onChange}
		style={{
			backgroundColor: 'navy',
			color: 'skyblue',
		}}
	/>
)
/* eslint-enable react/prop-types */

export const SimpleInputComponent = (
	args,
) => (
	<OneForm {...args}>
		<div>
			<Field>
				<Input name="message" />
			</Field>
		</div>

		<div>
			<FieldValue name="message" />
		</div>
	</OneForm>
)

export const Submit = (
	args,
) => (
	<OneForm {...args}>
		<div>
			<Field>
				<input name="message" />
			</Field>
		</div>
		<div>
			<button type="submit">
				Submit
			</button>
		</div>
	</OneForm>
)

export const Validation = (
	args,
) => (
	<OneForm {...args}>
		<div>
			<Field>
				<input name="message" />
			</Field>
		</div>
		<div>
			<FieldErrorMessage name="message" />
		</div>
		<div>
			<button type="submit">
				Submit
			</button>
		</div>
	</OneForm>
)

Validation
.args = {
	hasFieldChangeValidation: true,
	validations: {
		message: [
			{
				errorMessage: (
					'No lowercase letters.'
				),
				getIsValid: ({
					value,
				}) => (
					value
					&& (
						value
						=== (
							value
							.toUpperCase()
						)
					)
				),
			},
		],
	},
}

export const GroupValidation = (
	args,
) => (
	<OneForm {...args}>
		<div>
			<Field>
				<input
					name="message1"
					placeholder="Message 1"
				/>
			</Field>
		</div>
		<div>
			<Field>
				<input
					name="message2"
					placeholder="Message 2"
				/>
			</Field>
		</div>
		<div>
			<FieldErrorMessage name="message.error" />
		</div>
		<div>
			<button type="submit">
				Submit
			</button>
		</div>
	</OneForm>
)

GroupValidation
.args = {
	groupValidations: [
		{
			fieldNames: [
				'message1',
				'message2',
			],
			getErrorMessages: ({
				values,
			}) => (
				(
					(
						values
						.message1
					)
					!== (
						values
						.message2
					)
				)
				? {
					'message.error': (
						'Messages need to be identical.'
					),
					'message1': (
						true
					),
					'message2': (
						true
					),
				}
				: {}
			),
		},
	],
	hasFieldChangeValidation: true,
}
