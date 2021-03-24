import {
	useCallback,
	useState,
} from 'react'

import useObservableState from './useObservableState'

const initialValues = {}

const useVisitationState = (
	{
		onVisit = (
			Function
			.prototype
		),
	} = {}
) => {
	const [
		values,
		setValues,
	] = (
		useState(
			initialValues
		)
	)

	const {
		getValue: getIsVisited,
		setValue,
		subscribeToValue: subscribeToIsVisited,
	} = (
		useObservableState({
			onChange: ({
				identifier,
			}) => (
				onVisit(
					identifier
				)
			),
			values,
		})
	)

	const resetAllVisitations = (
		useCallback(
			() => (
				setValues(
					{}
				)
			),
			[],
		)
	)

	const setVisited = (
		useCallback(
			(
				identifier,
			) => {
				if (
					getIsVisited(
						identifier
					)
				) {
					return
				}

				setValue(
					identifier,
					true,
				)
			},
			[
				getIsVisited,
				setValue,
			],
		)
	)

	return {
		getIsVisited,
		resetAllVisitations,
		setVisited,
		subscribeToIsVisited,
	}
}

export default useVisitationState
