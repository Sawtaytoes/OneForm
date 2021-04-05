/* eslint-disable react/prop-types */
import FieldErrorMessage from './FieldErrorMessage.jsx'
import OneForm from './OneForm.jsx'

export default {
	title: 'Components/FieldErrorMessage',
}

export const Text = (
	errorMessages,
) => (
	<OneForm
		errorMessages={errorMessages}
	>
		<FieldErrorMessage name="message" />
	</OneForm>
)

Text
.args = {
	message: 'This is my field error.',
}

export const StyledText = (
	errorMessages,
) => (
	<OneForm
		errorMessages={errorMessages}
	>
		<div
			style={{
				color: 'red',
			}}
		>
			<FieldErrorMessage name="message" />
		</div>
	</OneForm>
)

StyledText
.args = {
	message: 'This field error is styled.',
}

export const Children = (
	errorMessages,
) => (
	<OneForm
		errorMessages={errorMessages}
	>
		<FieldErrorMessage name="message">
			<div
				style={{
					color: 'salmon',
				}}
			/>
		</FieldErrorMessage>
	</OneForm>
)

Children
.args = {
	message: 'This is an error message passed down to children.',
}
