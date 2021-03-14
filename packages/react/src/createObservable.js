const createObservable = () => {
	const subscribersRef = {
		current: [],
	}

	const publish = (
		value,
	) => {
		subscribersRef
		.current
		.forEach((
			subscriber,
		) => (
			subscriber(
				value
			)
		))
	}

	const subscribe = (
		subscriber = Function.prototype,
	) => {
		subscribersRef
		.current = (
			subscribersRef
			.current
			.concat(
				subscriber
			)
		)

		return () => {
			const subscriberIndex = (
				subscribersRef
				.current
				.indexOf(
					subscriber
				)
			)

			subscribersRef
			.current = (
				subscribersRef
				.current
				.slice(
					0,
					subscriberIndex,
				)
				.concat(
					subscribersRef
					.current
					.slice(
						subscriberIndex
						+ 1
					)
				)
			)
		}
	}

	return {
		_subscribersRef: subscribersRef,
		publish,
		subscribe,
	}
}

export default createObservable
