import {
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react'

import VisitationContext from './VisitationContext.js'

const useFieldVisitation = ({
	name,
}) => {
	const {
		getIsFieldVisited,
		setFieldVisited,
		subscribeToIsFieldVisited,
	} = (
		useContext(
			VisitationContext
		)
	)

	const [
		isVisited,
		setIsVisited,
	] = (
		useState(
			getIsFieldVisited(
				name
			)
		)
	)

	const setVisited = (
		useCallback(
			() => {
				setFieldVisited(
					name,
				)
			},
			[
				name,
				setFieldVisited,
			],
		)
	)

	useEffect(
		() => (
			subscribeToIsFieldVisited({
				identifier: (
					name
				),
				subscriber: (
					setIsVisited
				),
			})
		),
		[
			name,
			subscribeToIsFieldVisited,
		],
	)

	return {
		isVisited,
		setVisited,
	}
}

export default useFieldVisitation
