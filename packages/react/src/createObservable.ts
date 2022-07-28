const createObservable = <
  SubscriberValueType
>(
  initialValue: (
    | SubscriberValueType
    | null
  ) = null,
) => {
  const valueRef = {
    current: (
      initialValue
    ),
  }

  const subscribersRef = {
    current: (
      [] as (
        (
          | (
            (
              value: (
                | SubscriberValueType
                | null
              ),
            ) => void
          )
          | (
            () => void
          )
        )[]
      )
    ),
  }

  const cancelatorsRef = {
    current: (
      new Map()
    ),
  }

  const getValue = () => (
    valueRef
    .current
  )

  const publish = (
    value: (
      | SubscriberValueType
      | null
    ),
  ) => {
    valueRef
    .current = (
      value
    )

    subscribersRef
    .current
    .forEach((
      subscriber,
    ) => {
      cancelatorsRef
      .current
      .set(
        subscriber,
        (
          subscriber(
            value
          )
        ),
      )
    })
  }

  const subscribe = (
    subscriber = () => {},
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
      cancelatorsRef
      .current
      .get(
        subscriber
      )?.()

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
    __subscribersRef: subscribersRef,
    getValue,
    publish,
    subscribe,
  }
}

export default createObservable
