import {
	useCallback,
	useState,
} from 'react'

import useObservableState from './useObservableState'

const initialValues = {}

const useVisitationState = (
	{
		onChange,
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
			onChange,
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
			) => (
				setValue(
					identifier,
					true,
				)
			),
			[
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
