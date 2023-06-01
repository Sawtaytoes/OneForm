import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react'

import {
  createObservable,
} from './createObservable'

export enum SubmissionState {
  failedSubmission = 'failedSubmission',
  invalidSubmission = 'invalidSubmission',
  notSubmitted = 'notSubmitted',
  pendingSubmission = 'pendingSubmission',
  submitted = 'submitted',
}

export const useSubmissionState = (
  {
    getAllIdentifiers = (
      Function
      .prototype
    ),
    getAllValues = (
      Function
      .prototype
    ),
    getIsValid = (
      Function
      .prototype
    ),
    onBeforeSubmit = (
      Function
      .prototype
    ),
    onInvalidSubmit = (
      Function
      .prototype
    ),
    onSubmit = (
      Function
      .prototype
    ),
  } = {}
) => {
  const onBeforeSubmitRef = (
    useRef(onBeforeSubmit)
  )

  onBeforeSubmitRef
  .current = (
    onBeforeSubmit
  )

  const onInvalidSubmitRef = (
    useRef(onInvalidSubmit)
  )

  onInvalidSubmitRef
  .current = (
    onInvalidSubmit
  )

  const onSubmitRef = (
    useRef(onSubmit)
  )

  onSubmitRef
  .current = (
    onSubmit
  )

  const submissionStateObservable = (
    useMemo(
      () => (
        createObservable(
          SubmissionState
          .notSubmitted
        )
      ),
      [],
    )
  )

  const getSubmissionState = (
    useCallback(
      () => (
        submissionStateObservable
        .getValue()
      ),
      [
        submissionStateObservable,
      ],
    )
  )

  const subscribeToSubmissionState = (
    useCallback(
      (
        subscriber,
      ) => (
        submissionStateObservable
        .subscribe(
          subscriber
        )
      ),
      [
        submissionStateObservable,
      ],
    )
  )

  const formSubmitted = (
    useCallback(
      () => {
        onBeforeSubmitRef
        .current()

        if (
          getIsValid()
        ) {
          submissionStateObservable
          .publish(
            SubmissionState
            .pendingSubmission
          )
        }
        else {
          onInvalidSubmitRef
          .current()

          submissionStateObservable
          .publish(
            SubmissionState
            .invalidSubmission
          )
        }
      },
      [
        getIsValid,
        submissionStateObservable,
      ],
    )
  )

  useEffect(
    () => {
      const subscriber = (
        submissionState: SubmissionState,
      ) => {
        if (
          submissionState
          !== (
            SubmissionState
            .pendingSubmission
          )
        ) {
          return
        }

        const allValues = (
          getAllValues()
        )

        const allIdentifiers = (
          getAllIdentifiers()
        )

        const registeredValues = (
          Object
          .fromEntries(
            Object
            .entries(
              allValues
            )
            .filter(([
              identifier,
            ]) => (
              Reflect
              .has(
                allIdentifiers,
                identifier,
              )
            ))
          )
        )

        const abortController = (
          new AbortController()
        )

        ;(
          Promise
          .resolve(
            onSubmitRef
            .current({
              allValues,
              registeredValues,
            })
          )
        )
        .then(() => {
          if (
            abortController
            .signal
            .aborted
          ) {
            return
          }

          submissionStateObservable
          .publish(
            SubmissionState
            .submitted
          )
        })
        .catch(() => {
          if (
            abortController
            .signal
            .aborted
          ) {
            return
          }

          submissionStateObservable
          .publish(
            SubmissionState
            .failedSubmission
          )
        })

        return () => {
          abortController
          .abort()
        }
      }

      const unsubscribe = (
        submissionStateObservable
        .subscribe(
          subscriber
        )
      )

      return () => {
        unsubscribe()
      }
    },
    [
      getAllIdentifiers,
      getAllValues,
      submissionStateObservable,
    ]
  )

  return {
    formSubmitted,
    getSubmissionState,
    subscribeToSubmissionState,
  }
}
