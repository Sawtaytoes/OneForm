/* eslint-disable react/prop-types */
import FieldValue from './FieldValue.jsx'
import OneForm from './OneForm.jsx'

export default {
	title: 'Components/FieldValue',
}

export const Text = (
	values,
) => (
	<OneForm
		values={values}
	>
		<FieldValue name="message" />
	</OneForm>
)

Text
.args = {
	message: 'This is my field value.',
}

export const StyledText = (
	values,
) => (
	<OneForm
		values={values}
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
	values,
) => (
	<OneForm
		values={values}
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
