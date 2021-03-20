import {
	useRef,
} from 'react'

import useUpdateEffect from './useUpdateEffect'

const useSubscriptionEffect = ({
	subscriber,
	value = null,
}) => {
	const subscriberRef = (
		useRef()
	)

	subscriberRef
	.current = (
		subscriber
	)

	useUpdateEffect(
		() => {
			subscriberRef
			.current(
				value
			)
		},
		[
			value,
		],
	)
}

export default useSubscriptionEffect
