import {
	useCallback,
	useEffect,
	useMemo,
	useRef,
} from 'react'

import createObservable from './createObservable.js'

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
		onInvalidSubmit = (
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

	const onInvalidSubmitRef = (
		useRef()
	)

	onInvalidSubmitRef
	.current = (
		onInvalidSubmit
	)

	const onSubmitRef = (
		useRef()
	)

	onSubmitRef
	.current = (
		onSubmit
	)

	const submissionStateObservable = (
		useMemo(
			() => (
				createObservable(
					submissionStates
					.notSubmitted
				)
			),
			[],
		)
	)

	const getSubmissionState = (
		useCallback(
			() => (
				submissionStateObservable
				.getValue()
			),
			[
				submissionStateObservable,
			],
		)
	)

	const subscribeToSubmissionState = (
		useCallback(
			(
				subscriber,
			) => (
				submissionStateObservable
				.subscribe(
					subscriber
				)
			),
			[
				submissionStateObservable,
			],
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
					submissionStateObservable
					.publish(
						submissionStates
						.pendingSubmission
					)
				}
				else {
					onInvalidSubmitRef
					.current()

					submissionStateObservable
					.publish(
						submissionStates
						.invalidSubmission
					)
				}
			},
			[
				getIsValid,
				submissionStateObservable,
			],
		)
	)

	useEffect(
		() => {
			const subscriber = (
				submissionState,
			) => {
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

					submissionStateObservable
					.publish(
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

					submissionStateObservable
					.publish(
						submissionStates
						.failedSubmission
					)
				})

				return () => {
					abortController
					.abort()
				}
			}

			const unsubscribe = (
				submissionStateObservable
				.subscribe(
					subscriber
				)
			)

			return () => {
				unsubscribe()
			}
		},
		[
			getAllIdentifiers,
			getAllValues,
			submissionStateObservable,
		]
	)

	return {
		formSubmitted,
		getSubmissionState,
		subscribeToSubmissionState,
	}
}

export default useSubmissionState
