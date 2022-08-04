import {
  useCallback,
  useRef,
} from 'react'

import {
  createObservable,
  Observable,
  Subscriber,
  Unsubscriber,
} from './createObservable'

export type ObservableIdentifier = (
  | string
  | symbol
)

export type ObservableState<
  ObservableValue
> = {
  publishValue: (
    identifier: (
      ObservableIdentifier
    ),
    value: (
      ObservableValue
    ),
  ) => (
    void
  ),
  subscribeToValue: ({
    identifier,
    subscriber,
  }: {
    identifier: (
      ObservableIdentifier
    ),
    subscriber: (
      Subscriber<
        ObservableValue
      >
    ),
  }) => (
    Unsubscriber
  ),
}

const initialObservables = {}

export const useObservableState = <
  ObservableValue = any,
>() => {
  const observablesRef = (
    useRef<(
      Record<
        ObservableIdentifier,
        (
          Observable<
            ObservableValue
          >
        )
      >
    )>(
      initialObservables
    )
  )

  const getObservable = (
    useCallback(
      (
        identifier: (
          ObservableIdentifier
        ),
      ) => {
        if (
          !(
            observablesRef
            .current
            [identifier]
          )
        ) {
          observablesRef
          .current = {
            ...(
              observablesRef
              .current
            ),
            [identifier]: (
              createObservable<
                ObservableValue
              >()
            ),
          }
        }

        return (
          observablesRef
          .current
          [identifier]
        )
      },
      [],
    )
  )

  const publishValue: (
    ObservableState<
      ObservableValue
    >["publishValue"]
  ) = (
    useCallback(
      (
        identifier,
        value,
      ) => {
        getObservable(
          identifier
        )
        .publish(
          value
        )
      },
      [
        getObservable,
      ],
    )
  )

  const subscribeToValue: (
    ObservableState<
      ObservableValue
    >["subscribeToValue"]
  ) = (
    useCallback(
      ({
        identifier,
        subscriber,
      }) => (
        getObservable(
          identifier
        )
        .subscribe(
          subscriber
        )
      ),
      [
        getObservable,
      ],
    )
  )

  const returnValue: (
    ObservableState<
      ObservableValue
    >
  ) = {
    publishValue,
    subscribeToValue,
  }

  return returnValue
}
