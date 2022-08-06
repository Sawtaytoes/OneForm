import {
  useCallback,
  useRef,
} from 'react'

import {
  FieldName,
} from './useFieldName'
import {
  ObservableState,
  useObservableState,
} from './useObservableState'

export type Visitation = boolean

export type Visitations = (
  Set<
    FieldName
  >
)

export type VisitationState = {
  getAllVisitations: () => (
    Visitations
  ),
  getIsVisited: (
    identifier: (
      FieldName
    ),
  ) => (
    Visitation
  ),
  resetAllVisitations: () => (
    void
  ),
  setVisited: (
    identifier: (
      FieldName
    ),
  ) => (
    void
  ),
  subscribeToIsVisited: (
    ObservableState<
      boolean
    >['subscribeToValue']
  ),
}

const initialVisitations: (
  Visitations
) = (
  new Set()
)

export const useVisitationState = (
  {
    onVisit = (
      Function
      .prototype
    ),
  } = {}
) => {
  const onVisitRef = (
    useRef(
      onVisit
    )
  )

  onVisitRef
  .current = (
    onVisit
  )

  const {
    publishValue,
    subscribeToValue,
  } = (
    useObservableState()
  )

  const visitationsRef = (
    useRef(
      initialVisitations
    )
  )

  const getAllVisitations: (
    VisitationState['getAllVisitations']
  ) = (
    useCallback(
      () => (
        visitationsRef
        .current
      ),
      [],
    )
  )

  const getIsVisited: (
    VisitationState['getIsVisited']
  ) = (
    useCallback(
      (
        identifier,
      ) => (
        visitationsRef
        .current
        .has(
          identifier
        )
      ),
      [],
    )
  )

  const setVisitation = (
    useCallback(
      (
        identifier,
      ) => {
        visitationsRef
        .current = (
          new Set(
            visitationsRef
            .current
          )
          .add(
            identifier
          )
        )

        publishValue(
          identifier,
          true,
        )
      },
      [
        publishValue,
      ],
    )
  )

  const resetAllVisitations: (
    VisitationState['resetAllVisitations']
  ) = (
    useCallback(
      () => {
        Array
        .from(
          visitationsRef
          .current
          .values()
        )
        .forEach((
          identifier,
        ) => {
          publishValue(
            identifier,
            false,
          )
        })

        visitationsRef
        .current = (
          initialVisitations
        )
      },
      [
        publishValue,
      ],
    )
  )

  const setVisited: (
    VisitationState['setVisited']
  ) = (
    useCallback(
      (
        identifier,
      ) => {
        if (
          getIsVisited(
            identifier
          )
        ) {
          return
        }

        setVisitation(
          identifier,
        )

        onVisitRef
        .current(
          identifier
        )
      },
      [
        getIsVisited,
        setVisitation,
      ],
    )
  )

  const returnValue: (
    VisitationState
  ) = {
    getAllVisitations,
    getIsVisited,
    resetAllVisitations,
    setVisited,
    subscribeToIsVisited: (
      subscribeToValue
    ),
  }

  return returnValue
}
