import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react'

import createObservable from './createObservable'

const initialRequiredFieldNames = []

const useFormVisitationState = (
  {
    getAllFieldVisitations = (
      Function
      .prototype
    ),
    getIsFieldVisited = (
      Function
      .prototype
    ),
    getRegisteredFieldNames = (
      Function
      .prototype
    ),
  } = {},
) => {
  const requiredFieldNamesRef = (
    useRef(
      initialRequiredFieldNames
    )
  )

  const formVisitationStateObservable = (
    useMemo(
      () => (
        createObservable({
          isFormVisited: false,
          totalUnvisitedFields: 0,
          totalVisitedFields: 0,
        })
      ),
      [],
    )
  )

  const getFormVisitationState = (
    useCallback(
      () => (
        formVisitationStateObservable
        .getValue()
      ),
      [
        formVisitationStateObservable,
      ],
    )
  )

  const publishFormVisitationState = (
    useCallback(
      ({
        numberOfRequiredFields,
        numberOfVisitedFields,
        requiredFieldNames,
      }) => {
        formVisitationStateObservable
        .publish({
          isFormVisited: (
            numberOfVisitedFields
            === numberOfRequiredFields
          ),
          totalUnvisitedFields: (
            requiredFieldNames
            .filter((
              fieldName,
            ) => (
              !(
                getIsFieldVisited(
                  fieldName
                )
              )
            ))
            .length
          ),
          totalVisitedFields: (
            requiredFieldNames
            .filter(
              getIsFieldVisited
            )
            .length
          ),
        })
      },
      [
        formVisitationStateObservable,
        getIsFieldVisited,
      ],
    )
  )

  const setFormVisitationState = (
    useCallback(
      () => {
        const numberOfRequiredFields = (
          requiredFieldNamesRef
          .current
          .length
        )

        if (
          numberOfRequiredFields
          === 0
        ) {
          const registeredFieldNames = (
            getRegisteredFieldNames()
          )

          publishFormVisitationState({
            numberOfRequiredFields: (
              getAllFieldVisitations()
              .size
            ),
            numberOfVisitedFields: (
              registeredFieldNames
              .length
            ),
            requiredFieldNames: (
              registeredFieldNames
            ),
          })
        }
        else {
          const numberOfVisitedFields = (
            requiredFieldNamesRef
            .current
            .filter(
              getIsFieldVisited
            )
            .length
          )

          publishFormVisitationState({
            numberOfRequiredFields,
            numberOfVisitedFields,
            requiredFieldNames: (
              requiredFieldNamesRef
              .current
            ),
          })
        }
      },
      [
        getAllFieldVisitations,
        getIsFieldVisited,
        getRegisteredFieldNames,
        publishFormVisitationState,
      ],
    )
  )

  const setRequiredFieldNames = (
    useCallback(
      (
        requiredFieldNames,
      ) => {
        requiredFieldNamesRef
        .current = (
          requiredFieldNames
        )

        setFormVisitationState()
      },
      [
        setFormVisitationState,
      ],
    )
  )

  const subscribeToFormVisitationState = (
    useCallback(
      (
        subscriber,
      ) => (
        formVisitationStateObservable
        .subscribe(
          subscriber
        )
      ),
      [
        formVisitationStateObservable,
      ],
    )
  )

  useEffect(
    () => {
      setFormVisitationState()
    },
    [
      setFormVisitationState,
    ],
  )

  return {
    getFormVisitationState,
    setFormVisitationState,
    setRequiredFieldNames,
    subscribeToFormVisitationState,
  }
}

export default useFormVisitationState
