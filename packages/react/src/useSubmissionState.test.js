import {
	act,
	renderHook,
} from '@testing-library/react-hooks'

import useSubmissionState, {
	submissionStates,
} from './useSubmissionState.js'

const mockedSubmitEvent = {
	preventDefault: (
		Function
		.prototype
	),
}

describe(
	'useSubmissionState',
	() => {
		test(
			'starts as not submitted',
			() => {
				const {
					result,
				} = (
					renderHook(
						useSubmissionState,
					)
				)

				expect(
					result
					.current
					.submissionState
				)
				.toBe(
					submissionStates
					.notSubmitted
				)
			}
		)

		test(
			'does not submit when invalid',
			() => {
				const getIsValid = (
					jest
					.fn(() => (
						false
					))
				)

				const submitCallback = (
					jest
					.fn()
				)

				const {
					result,
				} = (
					renderHook(
						useSubmissionState,
						{
							initialProps: {
								getIsValid,
								onSubmit: (
									submitCallback
								),
							},
						},
					)
				)

				act(() => {
					result
					.current
					.formSubmitted(
						mockedSubmitEvent
					)
				})

				expect(
					getIsValid
				)
				.toHaveBeenCalledTimes(
					1
				)

				expect(
					submitCallback
				)
				.toHaveBeenCalledTimes(
					0
				)

				expect(
					result
					.current
					.submissionState
				)
				.toBe(
					submissionStates
					.invalidSubmission
				)
			}
		)

		test(
			'notifies before submitting',
			() => {
				const beforeSubmitCallback = (
					jest
					.fn()
				)

				const {
					result,
				} = (
					renderHook(
						useSubmissionState,
						{
							initialProps: {
								getIsValid: () => (
									false
								),
								onBeforeSubmit: (
									beforeSubmitCallback
								),
							},
						},
					)
				)

				act(() => {
					result
					.current
					.formSubmitted(
						mockedSubmitEvent
					)
				})

				expect(
					beforeSubmitCallback
				)
				.toHaveBeenCalledTimes(
					1
				)
			}
		)

		test(
			'is pending when submitting',
			() => {
				const {
					result,
					waitForNextUpdate,
				} = (
					renderHook(
						useSubmissionState,
						{
							initialProps: {
								getAllIdentifiers: () => (
									{}
								),
								getAllValues: () => (
									{}
								),
								getIsValid: () => (
									true
								),
							},
						},
					)
				)

				act(() => {
					result
					.current
					.formSubmitted(
						mockedSubmitEvent
					)
				})

				expect(
					result
					.current
					.submissionState
				)
				.toBe(
					submissionStates
					.pendingSubmission
				)

				return (
					waitForNextUpdate()
				)
			}
		)

		test(
			'is submitted when successfully submitted',
			() => {
				const {
					result,
					waitForNextUpdate,
				} = (
					renderHook(
						useSubmissionState,
						{
							initialProps: {
								getAllIdentifiers: () => (
									{}
								),
								getAllValues: () => (
									{}
								),
								getIsValid: () => (
									true
								),
							},
						},
					)
				)

				act(() => {
					result
					.current
					.formSubmitted(
						mockedSubmitEvent
					)
				})

				return (
					waitForNextUpdate()
					.then(() => {
						expect(
							result
							.current
							.submissionState
						)
						.toBe(
							submissionStates
							.submitted
						)
					})
				)
			}
		)

		test(
			'is failed when failed to submit',
			() => {
				const {
					result,
					waitForNextUpdate,
				} = (
					renderHook(
						useSubmissionState,
						{
							initialProps: {
								getAllIdentifiers: () => (
									{}
								),
								getAllValues: () => (
									{}
								),
								getIsValid: () => (
									true
								),
								onSubmit: () => (
									Promise
									.reject()
								),
							},
						},
					)
				)

				act(() => {
					result
					.current
					.formSubmitted(
						mockedSubmitEvent
					)
				})

				return (
					waitForNextUpdate()
					.then(() => {
						expect(
							result
							.current
							.submissionState
						)
						.toBe(
							submissionStates
							.failedSubmission
						)
					})
				)
			}
		)

		test(
			'gives all values when submitting',
			() => {
				const values = {
					email: 'john.smith@test.com',
					name: 'John Smith',
				}

				const submitCallback = (
					jest
					.fn()
				)

				const {
					result,
					waitForNextUpdate,
				} = (
					renderHook(
						useSubmissionState,
						{
							initialProps: {
								getAllIdentifiers: () => (
									{}
								),
								getAllValues: () => (
									values
								),
								getIsValid: () => (
									true
								),
								onSubmit: (
									submitCallback
								),
							},
						},
					)
				)

				act(() => {
					result
					.current
					.formSubmitted(
						mockedSubmitEvent
					)
				})

				expect(
					submitCallback
				)
				.toHaveBeenCalledTimes(
					1
				)

				expect(
					submitCallback
				)
				.toHaveBeenCalledWith({
					allValues: (
						values
					),
					submittedValues: (
						{}
					),
				})

				return (
					waitForNextUpdate()
				)
			}
		)

		test(
			'gives submitted values when submitting',
			() => {
				const values = {
					email: 'john.smith@test.com',
					name: 'John Smith',
				}

				const submitCallback = (
					jest
					.fn()
				)

				const {
					result,
					waitForNextUpdate,
				} = (
					renderHook(
						useSubmissionState,
						{
							initialProps: {
								getAllIdentifiers: () => ({
									email: true,
								}),
								getAllValues: () => (
									values
								),
								getIsValid: () => (
									true
								),
								onSubmit: (
									submitCallback
								),
							},
						},
					)
				)

				act(() => {
					result
					.current
					.formSubmitted(
						mockedSubmitEvent
					)
				})

				expect(
					submitCallback
				)
				.toHaveBeenCalledTimes(
					1
				)

				expect(
					submitCallback
				)
				.toHaveBeenCalledWith({
					allValues: (
						values
					),
					submittedValues: ({
						email: (
							values
							.email
						),
					}),
				})

				return (
					waitForNextUpdate()
				)
			}
		)

		test(
			'notifies newest callback when a submission occurs',
			() => {
				const submitCallback1 = (
					jest
					.fn()
				)

				const initialProps = {
					getAllIdentifiers: () => (
						{}
					),
					getAllValues: () => (
						{}
					),
					getIsValid: () => (
						true
					),
					onSubmit: (
						submitCallback1
					),
				}

				const {
					rerender,
					result,
					waitForNextUpdate,
				} = (
					renderHook(
						useSubmissionState,
						{
							initialProps,
						},
					)
				)

				const submitCallback2 = (
					jest
					.fn()
				)

				rerender({
					...initialProps,
					onSubmit: submitCallback2,
				})

				act(() => {
					result
					.current
					.formSubmitted(
						mockedSubmitEvent
					)
				})

				expect(
					submitCallback1
				)
				.toHaveBeenCalledTimes(
					0
				)

				expect(
					submitCallback2
				)
				.toHaveBeenCalledTimes(
					1
				)

				return (
					waitForNextUpdate()
				)
			}
		)
	}
)
