import {
	useCallback,
	useState,
} from 'react'

import useObservableState from './useObservableState'

const initialValues = {}

const useVisitationState = () => {
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
