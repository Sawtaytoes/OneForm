/* eslint-disable react/prop-types */
import { action } from '@storybook/addon-actions'

import OneForm from './OneForm.jsx'
import SubmitField from './SubmitField.jsx'

export default {
	args: {
		onChange: action(),
		onSubmit: action(),
	},
	argTypes: {
		onChange: 'changed',
		onSubmit: 'submitted',
	},
	// component: SubmitField,
	title: 'Components/SubmitField',
}

export const Submission = (
	args,
) => (
	<OneForm {...args}>
		<SubmitField>
			<button type="submit">
				Submit
			</button>
		</SubmitField>
	</OneForm>
)

Submission
.args = {
	onSubmit: ({
		registeredValues,
	}) => {
		action()(
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
		)
	},
}
