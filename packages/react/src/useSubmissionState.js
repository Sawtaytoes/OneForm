import {
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react'

export const submissionStates = {
	failedSubmission: 'failedSubmission',
	invalidSubmission: 'invalidSubmission',
	notSubmitted: 'notSubmitted',
	pendingSubmission: 'pendingSubmission',
	submitted: 'submitted',
}

const useSubmissionState = (
	{
		getAllIdentifiers = (
			Function
			.prototype
		),
		getAllValues = (
			Function
			.prototype
		),
		getIsValid = (
			Function
			.prototype
		),
		setSubmitting = (
			Function
			.prototype
		),
		onSubmit = (
			Function
			.prototype
		),
	} = {}
) => {
	const onSubmitRef = (
		useRef()
	)

	onSubmitRef
	.current = (
		onSubmit
	)

	const [
		submissionState,
		setSubmissionState,
	] = (
		useState(
			submissionStates
			.notSubmitted
		)
	)

	const formSubmitted = (
		useCallback(
			(
				event
			) => {
				event
				.preventDefault()

				Object
				.keys(
					getAllIdentifiers()
				)
				.forEach(
					setSubmitting
				)

				if (
					getIsValid()
				) {
					setSubmissionState(
						submissionStates
						.pendingSubmission
					)
				}
				else {
					setSubmissionState(
						submissionStates
						.invalidSubmission
					)
				}
			},
			[
				getAllIdentifiers,
				getIsValid,
				setSubmitting,
			],
		)
	)

	useEffect(
		() => {
			if (
				submissionState
				!== (
					submissionStates
					.pendingSubmission
				)
			) {
				return
			}

			const allValues = (
				getAllValues()
			)

			const allIdentifiers = (
				getAllIdentifiers()
			)

			const submittedValues = (
				Object
				.fromEntries(
					Object
					.entries(
						getAllValues()
					)
					.filter(([
						identifier,
					]) => (
						Reflect
						.has(
							allIdentifiers,
							identifier,
						)
					))
				)
			)

			const abortController = (
				new AbortController()
			)

			;(
				(
					onSubmitRef
					.current({
						allValues,
						submittedValues,
					})
				)
				|| (
					Promise
					.resolve()
				)
			)
			.then(() => {
				if (
					abortController
					.signal
					.aborted
				) {
					return
				}

				setSubmissionState(
					submissionStates
					.submitted
				)
			})
			.catch(() => {
				if (
					abortController
					.signal
					.aborted
				) {
					return
				}

				setSubmissionState(
					submissionStates
					.failedSubmission
				)
			})

			return () => {
				abortController
				.abort()
			}
		},
		[
			getAllIdentifiers,
			getAllValues,
			submissionState,
		]
	)

	return {
		formSubmitted,
		submissionState,
	}
}

export default useSubmissionState
