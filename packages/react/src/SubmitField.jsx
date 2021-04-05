import PropTypes from 'prop-types'
import {
	Children,
	cloneElement,
	memo,
	useMemo,
} from 'react'

import useFormSubmission from './useFormSubmission'

const defaultGetIsVisible = () => (
	true
)

const propTypes = {
	children: PropTypes.node,
	fallback: PropTypes.node,
	getIsVisible: PropTypes.func,
	isDisabledWhenInvalid: PropTypes.bool,
}

const SubmitField = ({
	children,
	fallback,
	getIsVisible = defaultGetIsVisible,
	isDisabledWhenInvalid,
}) => {
	const {
		disabled,
		isDisabled,
	} = (
		children
		.props
	)

	const {
		isFormValid,
		isHtmlElement,
		isSubmitting,
		submissionState,
	} = (
		useFormSubmission({
			children,
		})
	)

	const childProps = (
		useMemo(
			() => (
				isHtmlElement
				? {
					'data-loading': (
						isSubmitting
						? 'true'
						: null
					),
					'data-submission-state': (
						submissionState
					),
					'disabled': (
						isDisabledWhenInvalid
						? !isFormValid
						: disabled
					),
				}
				: {
					disabled: (
						isDisabledWhenInvalid
						? !isFormValid
						: disabled
					),
					isDisabled: (
						isDisabledWhenInvalid
						? !isFormValid
						: isDisabled
					),
					isLoading: isSubmitting,
					isSubmitting,
					loading: isSubmitting,
					submissionState,
				}
			),
			[
				disabled,
				isDisabled,
				isDisabledWhenInvalid,
				isFormValid,
				isHtmlElement,
				isSubmitting,
				submissionState,
			]
		)
	)

	const isVisible = (
		useMemo(
			() => (
				getIsVisible({
					isFormValid,
					isSubmitting,
					submissionState,
				})
			),
			[
				getIsVisible,
				isFormValid,
				isSubmitting,
				submissionState,
			]
		)
	)

	return (
		isVisible
		? (
			children
			? (
				cloneElement(
					(
						Children
						.only(
							children
						)
					),
					childProps,
				)
			)
			: (
				childProps
				.children
			)
		)
		: (
			fallback
			|| (
				childProps
				.children
			)
		)
	)
}

SubmitField.propTypes = propTypes

const MemoizedSubmitField = memo(SubmitField)

export default MemoizedSubmitField
