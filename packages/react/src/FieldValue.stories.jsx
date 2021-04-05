/* eslint-disable react/prop-types */
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
	title: 'Components/FieldValue',
}

export const Text = (
	updatedValues,
) => (
	<OneForm
		updatedValues={updatedValues}
	>
		<FieldValue name="message" />
	</OneForm>
)

Text
.args = {
	message: 'This is my field value.',
}

export const StyledText = (
	updatedValues,
) => (
	<OneForm
		updatedValues={updatedValues}
	>
		<div
			style={{
				color: 'green',
			}}
		>
			<FieldValue name="message" />
		</div>
	</OneForm>
)

StyledText
.args = {
	message: 'This field value is styled.',
}

export const Children = (
	updatedValues,
) => (
	<OneForm
		updatedValues={updatedValues}
	>
		<FieldValue name="message">
			<div
				style={{
					color: 'blue',
				}}
			/>
		</FieldValue>
	</OneForm>
)

Children
.args = {
	message: 'This is a message passed down to children.',
}

export const Fallback = (
	updatedValues,
) => (
	<OneForm
		updatedValues={updatedValues}
	>
		<FieldValue
			fallback={
				<div>
					No value yet.
				</div>
			}
			name="message"
		>
			<div />
		</FieldValue>
	</OneForm>
)

Fallback
.args = {
	message: '',
}

export const CustomVisibility = (
	updatedValues,
) => (
	<OneForm
		updatedValues={updatedValues}
	>
		<FieldValue
			fallback={
				<div>
					Fallback activated when value is &quot;1&quot;.
				</div>
			}
			getIsVisible={(
				value,
			) => (
				value !== '1'
			)}
			name="message"
		>
			<div />
		</FieldValue>
	</OneForm>
)

CustomVisibility
.args = {
	message: '1',
}
