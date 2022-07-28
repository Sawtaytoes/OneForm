import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react'

import {
  createObservable,
  Subscriber,
  Unsubscriber,
} from './createObservable'
import {
  FieldName,
} from './useFieldName'

export type FormVisitationSubscriberValue = {
  isFormVisited: boolean,
  totalUnvisitedFields: number,
  totalVisitedFields: number,
}

export type FormVisitationState = {
  getFormVisitationState: () => boolean,
  setFormVisitationState: () => void,
  setRequiredFieldNames: (
    requiredFieldNames: string[]
  ) => void,
  subscribeToFormVisitationState: (
    subscriber: (
      Subscriber<
        boolean
      >
    )
  ) => Unsubscriber,
}

const initialRequiredFieldNames: (
  FieldName[]
) = []

const defaultProps = {
  getAllFieldVisitations: () => (
    new Map()
  ),
  getIsFieldVisited: () => (
    false
  ),
  getRegisteredFieldNames: () => (
    []
  ),
}

export const useFormVisitationState = (
  {
    getAllFieldVisitations = (
      defaultProps
      .getAllFieldVisitations
    ),
    getIsFieldVisited = (
      defaultProps
      .getIsFieldVisited
    ),
    getRegisteredFieldNames = (
      defaultProps
      .getRegisteredFieldNames
    ),
  }: {
    getAllFieldVisitations?: () => (
      Map<
        string,
        boolean
      >
    ),
    getIsFieldVisited?: (
      fieldName: FieldName,
    ) => (
      boolean
    ),
    getRegisteredFieldNames?: () => (
      FieldName[]
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
        createObservable<
          FormVisitationSubscriberValue
        >({
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
      }: {
        numberOfRequiredFields: number,
        numberOfVisitedFields: number,
        requiredFieldNames: FieldName[],
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
        requiredFieldNames: FieldName[],
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
        subscriber: (
          Subscriber<
            FormVisitationSubscriberValue
          >
        ),
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
