const createObservable = () => {
	const stateRef = {
		current: null,
	}

	const subscribersRef = {
		current: [],
	}

	const getState = () => (
		stateRef
		.current
	)

	const publish = (
		value,
	) => {
		stateRef
		.current = (
			value
		)

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
		getState,
		publish,
		subscribe,
	}
}

export default createObservable
