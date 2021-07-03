import {
  useCallback,
  useRef,
} from 'react'

import createObservable from './createObservable.js'

const initialObservables = {}

const useObservableState = () => {
  const observablesRef = (
    useRef(
      initialObservables
    )
  )

  const getObservable = (
    useCallback(
      (
        identifier,
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
              createObservable()
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

  const publishValue = (
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

  const subscribeToValue = (
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

  return {
    publishValue,
    subscribeToValue,
  }
}

export default useObservableState
