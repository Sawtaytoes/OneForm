import {
  useCallback,
  useMemo,
} from 'react'

import createObservable from './createObservable.js'

export const formChangeStates = {
  committed: 'committed',
  staged: 'staged',
  unchanged: 'unchanged',
}

const useFormChangeState = () => {
  const formChangeStateObservable = (
    useMemo(
      () => (
        createObservable(
          formChangeStates
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
        changeState,
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
        subscriber,
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

export default useFormChangeState
