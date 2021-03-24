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

export const Simple = (
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
				validate: (
					value,
				) => (
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
