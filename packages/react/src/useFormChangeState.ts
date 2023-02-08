import {
  useCallback,
  useMemo,
} from 'react'

import {
  createObservable,
  Subscriber,
} from './createObservable'

export enum FormChangeState {
  committed = 'committed',
  staged = 'staged',
  unchanged = 'unchanged',
}

export const useFormChangeState = () => {
  const formChangeStateObservable = (
    useMemo(
      () => (
        createObservable(
          FormChangeState
          .unchanged
        )
      ),
      [],
    )
  )

  const getFormChangeState = (
    useCallback(
      () => (
        formChangeStateObservable
        .getValue()
      ),
      [
        formChangeStateObservable,
      ],
    )
  )

  const setFormChangeState = (
    useCallback(
      (
        changeState: FormChangeState,
      ) => {
        if (
          changeState
          === getFormChangeState()
        ) {
          return
        }

        formChangeStateObservable
        .publish(
          changeState
        )
      },
      [
        formChangeStateObservable,
        getFormChangeState,
      ],
    )
  )

  const subscribeToFormChangeState = (
    useCallback(
      (
        subscriber: (
          Subscriber<
            FormChangeState
          >
        ),
      ) => (
        formChangeStateObservable
        .subscribe(
          subscriber
        )
      ),
      [
        formChangeStateObservable,
      ],
    )
  )

  return {
    getFormChangeState,
    setFormChangeState,
    subscribeToFormChangeState,
  }
}
