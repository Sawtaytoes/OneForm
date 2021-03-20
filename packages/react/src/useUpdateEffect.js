import {
	useEffect,
	useRef,
} from 'react'

const useUpdateEffect = (
	callback,
	dependencies = [],
) => {
	const isFirstUpdateRef = (
		useRef(
			true
		)
	)

	const callbackRef = (
		useRef()
	)

	callbackRef
	.current = (
		callback
	)

	useEffect(
		() => {
			if (
				isFirstUpdateRef
				.current
			) {
				isFirstUpdateRef
				.current = (
					false
				)

				return
			}

			return (
				callbackRef
				.current()
			)
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		dependencies,
	)
}

export default useUpdateEffect
