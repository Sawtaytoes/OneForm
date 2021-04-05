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
		getFormValidationState,
		getSubmissionState,
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
		isFormValid,
		setIsFormValid,
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
			subscribeToFormValidationState(
				setIsFormValid
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
		isFormValid,
		isHtmlElement,
		isSubmitting,
		submissionState,
	}
}

export default useFormSubmission
