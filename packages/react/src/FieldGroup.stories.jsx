/* eslint-disable react/prop-types */
import Field from './Field.jsx'
import FieldGroup from './FieldGroup.jsx'
import OneForm from './OneForm.jsx'

export default {
	title: 'Components/FieldGroup',
}

export const Sample = () => (
	<OneForm>
		<FieldGroup
			id="1"
			name="addressId"
		>
			<div>
				<Field>
					<input
						name="name"
					/>
				</Field>
			</div>
			<FieldGroup
				id="1"
				name="emailId"
			>
				<div>
					<Field>
						<input
							name="email"
						/>
					</Field>
				</div>
			</FieldGroup>
			<FieldGroup
				id="2"
				name="emailId"
			>
				<div>
					<Field>
						<input
							name="email"
						/>
					</Field>
				</div>
			</FieldGroup>
		</FieldGroup>
	</OneForm>
)
