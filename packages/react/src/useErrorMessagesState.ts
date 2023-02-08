import {
  useCallback,
  useEffect,
  useRef,
} from 'react'

import {
  ObservableIdentifier,
  useObservableState,
} from './useObservableState'

export type ErrorMessages = (
  string[]
)

export type ErrorMessageSegmentId = (
  symbol
)

export type Errors = (
  Record<
    ObservableIdentifier,
    ErrorMessages
  >
)

const externalErrorMessagesSymbol = Symbol()

const initialErrorMessages: (
  Errors
) = {}

const initialLocalErrorMessages: (
  Errors
) = {}

const initialLocalErrorMessagesList: (
  ErrorMessages
) = []

export const useErrorMessagesState = (
  {
    errorMessages = (
      initialErrorMessages
    ),
    onErrorMessages = (
      Function
      .prototype
    ),
    updatedErrorMessages = (
      initialErrorMessages
    ),
  } = {}
) => {
  const onErrorMessagesRef = (
    useRef(
      onErrorMessages
    )
  )

  useEffect(
    () => {
      onErrorMessagesRef
      .current = (
        onErrorMessages
      )
    },
    [
      onErrorMessages,
    ]
  )

  const {
    publishValue,
    subscribeToValue,
  } = (
    useObservableState<
      ErrorMessages
    >()
  )

  const localErrorMessagesRef = (
    useRef(
      initialLocalErrorMessages
    )
  )

  const localErrorMessagesListRef = (
    useRef(
      initialLocalErrorMessagesList
    )
  )

  const getAllLocalErrorMessages = (
    useCallback(
      () => (
        localErrorMessagesRef
        .current
      ),
      [],
    )
  )

  const getLocalErrorMessages = (
    useCallback(
      (
        identifier: ObservableIdentifier,
      ) => (
        getAllLocalErrorMessages()
        [identifier]
      ),
      [
        getAllLocalErrorMessages,
      ],
    )
  )

  const getLocalErrorMessagesByField = (
    useCallback(
      () => (
        Object
        .entries(
          localErrorMessagesRef
          .current
        )
        .map(
          ([
            fieldName,
            errorsMap,
          ]) => [
            fieldName,
            Array
            .from(
              errorsMap
              .values()
            )
            .flat(),
          ]
        )
        .map(
          ([
            fieldName,
            errorMessages,
          ]) => ({
            errorMessages,
            fieldName,
          })
        )
      ),
      [
        localErrorMessagesRef,
      ],
    )
  )

  const getAllLocalErrorMessagesList = (
    useCallback(
      () => (
        localErrorMessagesListRef
        .current
      ),
      [],
    )
  )

  const getLocalErrorMessagesList = (
    useCallback(
      (
        identifier: ObservableIdentifier,
      ) => (
        Array
        .from(
          (
            (
              getLocalErrorMessages(
                identifier
              )
            )
            || new Map()
          )
          .values()
        )
        .flat()
      ),
      [
        getLocalErrorMessages,
      ],
    )
  )

  const cacheAllLocalErrorMessagesList = (
    useCallback(
      () => {
        localErrorMessagesListRef
        .current = (
          Object
          .values(
            localErrorMessagesRef
            .current
          )
          .map((
            errorsMap,
          ) => (
            Array
            .from(
              errorsMap
              .values()
            )
          ))
          .flat()
          .flat()
        )
      },
      [],
    )
  )

  const setLocalErrorMessages = (
    useCallback(
      (
        identifier: ObservableIdentifier,
        {
          errorMessages: nextErrorMessages,
          symbol,
        }: {
          errorMessages: ErrorMessages,
          symbol: ErrorMessageSegmentId,
        },
      ) => {
        localErrorMessagesRef
        .current = {
          ...(
            getAllLocalErrorMessages()
          ),
          [identifier]: (
            new Map(
              getLocalErrorMessages(
                identifier
              )
            )
            .set(
              symbol,
              (
                (
                  (
                    Array
                    .isArray(
                      nextErrorMessages
                    )
                  )
                  ? (
                    nextErrorMessages
                  )
                  : [
                    (
                      nextErrorMessages === true
                      ? ' '
                      : nextErrorMessages
                    ),
                  ]
                )
                .filter(
                  Boolean
                )
              ),
            )
          ),
        }

        const errorMessagesList = (
          getLocalErrorMessagesList(
            identifier
          )
        )

        if (
          (
            errorMessagesList
            .length
          )
          === 0
        ) {
          localErrorMessagesRef
          .current = {
            ...(
              localErrorMessagesRef
              .current
            ),
          }

          Reflect
          .deleteProperty(
            (
              localErrorMessagesRef
              .current
            ),
            identifier,
          )
        }

        cacheAllLocalErrorMessagesList()

        onErrorMessagesRef
        .current({
          errorMessages: errorMessagesList,
          identifier,
        })

        publishValue(
          identifier,
          errorMessagesList,
        )
      },
      [
        cacheAllLocalErrorMessagesList,
        getAllLocalErrorMessages,
        getLocalErrorMessages,
        getLocalErrorMessagesList,
        publishValue,
      ],
    )
  )

  useEffect(
    () => {
      Object
      .entries({
        ...(
          localErrorMessagesRef
          .current
        ),
        ...errorMessages,
      })
      .map(([
        identifier,
        errorMessages,
      ]) => ({
        errorMessages: (
          errorMessages instanceof Map
          ? undefined
          : errorMessages
        ),
        identifier,
      }))
      .forEach(({
        errorMessages,
        identifier,
      }) => {
        setLocalErrorMessages(
          identifier,
          {
            errorMessages,
            symbol: externalErrorMessagesSymbol,
          },
        )
      })
    },
    [
      errorMessages,
      setLocalErrorMessages,
    ],
  )

  useEffect(
    () => {
      Object
      .entries(
        updatedErrorMessages
      )
      .forEach(([
        identifier,
        errorMessages,
      ]) => {
        setLocalErrorMessages(
          identifier,
          {
            errorMessages,
            symbol: externalErrorMessagesSymbol,
          },
        )
      })
    },
    [
      setLocalErrorMessages,
      updatedErrorMessages,
    ],
  )

  return {
    getAllErrorMessages: getAllLocalErrorMessagesList,
    getAllErrorMessagesByField: getLocalErrorMessagesByField,
    getErrorMessages: getLocalErrorMessagesList,
    setErrorMessages: setLocalErrorMessages,
    subscribeToErrorMessages: subscribeToValue,
  }
}
