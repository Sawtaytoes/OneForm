/* eslint-disable react/prop-types */
import { action } from '@storybook/addon-actions'

import Field from './Field.jsx'
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
	component: Field,
	title: 'Components/Field',
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
	</OneForm>
)

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

export const SimpleInputComponent = (
	args,
) => (
	<OneForm {...args}>
		<div>
			<Field>
				<Input name="message" />
			</Field>
		</div>
	</OneForm>
)

export const CheckboxElement = (
	args,
) => (
	<OneForm {...args}>
		<div>
			<label>
				<Field>
					<input
						name="message"
						type="checkbox"
					/>
				</Field>

				Check me!
			</label>
		</div>
	</OneForm>
)

const Checkbox = ({
	name,
	onChange,
}) => (
	<label>
		<input
			name={name}
			onChange={onChange}
			type="checkbox"
		/>

		Check me!
	</label>
)

export const CheckboxComponent = (
	args,
) => (
	<OneForm {...args}>
		<div>
			<Field>
				<Checkbox name="message" />
			</Field>
		</div>
	</OneForm>
)
