import {
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react'

import SubmissionContext from './SubmissionContext.js'
import useIsHtmlElement from './useIsHtmlElement.js'
import {
	submissionStates,
} from './useSubmissionState'

const useFormSubmission = ({
	children,
}) => {
	const {
		getFormChangeState,
		getFormValidationState,
		getSubmissionState,
		subscribeToFormChangeState,
		subscribeToFormValidationState,
		subscribeToSubmissionState,
	} = (
		useContext(
			SubmissionContext
		)
	)

	const isHtmlElement = (
		useIsHtmlElement(
			children
		)
	)

	const [
		formChangeState,
		setFormChangeState,
	] = (
		useState(
			getFormChangeState()
		)
	)

	const [
		formValidationState,
		setFormValidationState,
	] = (
		useState(
			getFormValidationState()
		)
	)

	const [
		submissionState,
		setSubmissionState,
	] = (
		useState(
			getSubmissionState()
		)
	)

	const isSubmitting = (
		useMemo(
			() => (
				submissionState
				=== (
					submissionStates
					.pendingSubmission
				)
			),
			[
				submissionState,
			]
		)
	)

	useEffect(
		() => (
			subscribeToFormChangeState(
				setFormChangeState
			)
		),
		[
			subscribeToFormChangeState,
		],
	)

	useEffect(
		() => (
			subscribeToFormValidationState(
				setFormValidationState
			)
		),
		[
			subscribeToFormValidationState,
		],
	)

	useEffect(
		() => (
			subscribeToSubmissionState(
				setSubmissionState
			)
		),
		[
			subscribeToSubmissionState,
		],
	)

	return {
		formChangeState,
		isFormValid: (
			formValidationState
			.isFormValid
		),
		isHtmlElement,
		isSubmitting,
		submissionState,
		totalErrorMessages: (
			formValidationState
			.totalErrorMessages
		),
	}
}

export default useFormSubmission
