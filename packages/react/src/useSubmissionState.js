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
		onBeforeSubmit = (
			Function
			.prototype
		),
		onSubmit = (
			Function
			.prototype
		),
	} = {}
) => {
	const onBeforeSubmitRef = (
		useRef()
	)

	onBeforeSubmitRef
	.current = (
		onBeforeSubmit
	)

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

				onBeforeSubmitRef
				.current()

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
				getIsValid,
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

			const registeredValues = (
				Object
				.fromEntries(
					Object
					.entries(
						allValues
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
						registeredValues,
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
