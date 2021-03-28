import {
	useCallback,
	useRef,
} from 'react'

import useObservableState from './useObservableState'

const initialVisitations = new Set()

const useVisitationState = (
	{
		onVisit = (
			Function
			.prototype
		),
	} = {}
) => {
	const onVisitRef = (
		useRef()
	)

	onVisitRef
	.current = (
		onVisit
	)

	const {
		publishUndefinedValues,
		publishValue,
		subscribeToValue,
	} = (
		useObservableState()
	)

	const visitationsRef = (
		useRef(
			initialVisitations
		)
	)

	const getIsVisited = (
		useCallback(
			(
				identifier,
			) => (
				visitationsRef
				.current
				.has(
					identifier
				)
			),
			[],
		)
	)

	const setVisitation = (
		useCallback(
			(
				identifier,
			) => {
				visitationsRef
				.current = (
					new Set(
						visitationsRef
						.current
					)
					.add(
						identifier
					)
				)

				publishValue(
					identifier,
					true,
				)
			},
			[
				publishValue,
			],
		)
	)

	const resetAllVisitations = (
		useCallback(
			() => {
				visitationsRef
				.current = (
					initialVisitations
				)

				publishUndefinedValues()
			},
			[
				publishUndefinedValues,
			],
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

				setVisitation(
					identifier,
				)

				onVisitRef
				.current(
					identifier
				)
			},
			[
				getIsVisited,
				setVisitation,
			],
		)
	)

	return {
		getIsVisited,
		resetAllVisitations,
		setVisited,
		subscribeToIsVisited: subscribeToValue,
	}
}

export default useVisitationState
