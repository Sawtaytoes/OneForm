import {
  useCallback,
  useEffect,
  useRef,
} from 'react'

import useObservableState from './useObservableState.js'

const externalErrorMessagesSymbol = Symbol()
const initialErrorMessages = {}
const initialLocalErrorMessages = {}
const initialLocalErrorMessagesList = []

const useErrorMessagesState = (
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
    useRef()
  )

  onErrorMessagesRef
  .current = (
    onErrorMessages
  )

  const {
    publishValue,
    subscribeToValue,
  } = (
    useObservableState()
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
        identifier,
      ) => (
        getAllLocalErrorMessages()
        [identifier]
      ),
      [
        getAllLocalErrorMessages,
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
        identifier,
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
        identifier,
        {
          errorMessages: nextErrorMessages,
          symbol,
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

        const errorMessageslist = (
          getLocalErrorMessagesList(
            identifier
          )
        )

        if (
          (
            errorMessageslist
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
          errorMessages: errorMessageslist,
          identifier,
        })

        publishValue(
          identifier,
          errorMessageslist,
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
    getErrorMessages: getLocalErrorMessagesList,
    setErrorMessages: setLocalErrorMessages,
    subscribeToErrorMessages: subscribeToValue,
  }
}

export default useErrorMessagesState
