export type Subscriber<
  ValueType
> = (
  | (
    (
      value: (
        | ValueType
        | null
      ),
    ) => void
  )
  | (
    () => void
  )
)

export type Unsubscriber = (
  () => void
)

export type Observable<
  ValueType,
> = {
  __subscribersRef: {
    current: (
      Subscriber<
        ValueType
      >[]
    ),
  },
  getValue: () => (
    | ValueType
    | null
  ),
  publish: (
    value: (
      | ValueType
      | null
    ),
  ) => void,
  subscribe: (
    subscriber: (
      Subscriber<
        ValueType
      >
    ),
  ) => Unsubscriber,
}

export const createObservable = <
  SubscriberValue,
>(
  initialValue: (
    | SubscriberValue
    | null
  ) = null,
) => {
  const valueRef = {
    current: (
      initialValue
    ),
  }

  const subscribersRef: (
    Observable<
      SubscriberValue
    >["__subscribersRef"]
  ) = {
    current: (
      []
    ),
  }

  const cancelatorsRef = {
    current: (
      new Map()
    ) as (
      Map<
        Subscriber<
          SubscriberValue
        >,
        (
          | (
            () => () => void
          )
          | void
        )
      >
    ),
  }

  const getValue: (
    Observable<
      SubscriberValue
    >["getValue"]
  ) = () => (
    valueRef
    .current
  )

  const publish: (
    Observable<
      SubscriberValue
    >["publish"]
  ) = (
    value
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
  
  const subscribe: (
    Observable<
      SubscriberValue
    >["subscribe"]
  ) = (
    subscriber,
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
