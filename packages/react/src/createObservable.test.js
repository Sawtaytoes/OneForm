import createObservable from './createObservable.js'

describe(
	'createObservable',
	() => {
		test(
			'create an observable',
			() => {
				const observable = (
					createObservable()
				)

				const unsubscribe = (
					observable
					.subscribe()
				)

				unsubscribe()

				expect(
					typeof (
						observable
						.publish
					)
				)
				.toBe(
					'function'
				)

				expect(
					typeof (
						observable
						.subscribe
					)
				)
				.toBe(
					'function'
				)
			}
		)

		test(
			'unsubscribe from a subscriber',
			() => {
				const observable = (
					createObservable()
				)

				const unsubscribe = (
					observable
					.subscribe(
						() => {}
					)
				)

				unsubscribe()

				expect(
					observable
					._subscribersRef
					.current
				)
				.toHaveLength(0)
			}
		)

		test(
			'unsubscribe from no subscriber',
			() => {
				const observable = (
					createObservable()
				)

				const unsubscribe = (
					observable
					.subscribe()
				)

				unsubscribe()

				expect(
					observable
					._subscribersRef
					.current
				)
				.toHaveLength(0)
			}
		)

		test(
			'unsubscribe from all subscribers',
			() => {
				const observable = (
					createObservable()
				)

				const unsubscribe1 = (
					observable
					.subscribe()
				)

				const unsubscribe2 = (
					observable
					.subscribe()
				)

				unsubscribe1()

				expect(
					observable
					._subscribersRef
					.current
				)
				.toHaveLength(1)

				unsubscribe2()

				expect(
					observable
					._subscribersRef
					.current
				)
				.toHaveLength(0)
			}
		)

		test(
			'unsubscribe from all subscribers when unsubscribed out of order',
			() => {
				const observable = (
					createObservable()
				)

				const unsubscribe1 = (
					observable
					.subscribe()
				)

				const unsubscribe2 = (
					observable
					.subscribe()
				)

				unsubscribe2()

				expect(
					observable
					._subscribersRef
					.current
				)
				.toHaveLength(1)

				unsubscribe1()

				expect(
					observable
					._subscribersRef
					.current
				)
				.toHaveLength(0)
			}
		)

		test(
			'publish to all subscribers',
			() => {
				const observable = (
					createObservable()
				)

				const mockSubscriber1 = (
					jest
					.fn()
				)

				const mockSubscriber2 = (
					jest
					.fn()
				)

				const unsubscribe1 = (
					observable
					.subscribe(
						mockSubscriber1
					)
				)

				const unsubscribe2 = (
					observable
					.subscribe(
						mockSubscriber2
					)
				)

				const value = {}

				observable
				.publish(
					value
				)

				unsubscribe1()
				unsubscribe2()

				expect(
					mockSubscriber1
				)
				.toHaveBeenCalledTimes(
					1
				)

				expect(
					mockSubscriber2
				)
				.toHaveBeenCalledTimes(
					1
				)

				expect(
					mockSubscriber1
				)
				.toHaveBeenCalledWith(
					value
				)

				expect(
					mockSubscriber2
				)
				.toHaveBeenCalledWith(
					value
				)
			}
		)

		test(
			'maintain the value that was published',
			() => {
				const observable = (
					createObservable()
				)

				const value = {}

				observable
				.publish(
					value
				)

				expect(
					observable
					.getValue()
				)
				.toBe(
					value
				)
			}
		)
	}
)
