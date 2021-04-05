import Field from './Field.jsx'
import OneForm from './OneForm.jsx'

export default {
	component: Field,
	title: 'Components/Field',
}

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

/* eslint-disable react/prop-types */
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
/* eslint-enable react/prop-types */

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
