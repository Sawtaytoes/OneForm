import PropTypes from 'prop-types'
import { createSignal } from 'solid-js'

const propTypes = {
	children: PropTypes.node,
	onSubmit: PropTypes.func,
}

const OneForm = ({
	children,
	onSubmit,
}) => {
	const [
		messageValue,
		setMessageValue,
	] = (
		createSignal('')
	)

	const formSubmitted = (
		event,
	) => {
		event
		.preventDefault()

		onSubmit({
			allFields: {
				message: messageValue(),
			},
			registeredFields: {
				message: messageValue(),
			},
		})
	}

	return (
		<form
			onSubmit={formSubmitted}
			role="form"
		>
			{children}

			<input
				name="message"
				onInput={(
					event,
				) => {
					setMessageValue(
						event
						.target
						.value
					)
				}}
			/>

			<div>
				{messageValue()}
			</div>

			<div>
				<button>
					SUBMIT
				</button>
			</div>
		</form>
	)
}

OneForm.propTypes = propTypes

export default OneForm
