import {
  useContext,
  useMemo,
} from 'react'

import {
  SubformContext,
} from './SubformContext'

export const useSubformData = () => {
  const subformId = (
    useMemo(
      () => (
        Symbol()
      ),
      [],
    )
  )

  const subformContext = (
    useContext(
      SubformContext
    )
  )

  const segmentedSubformContext = (
    useMemo(
      () => (
        Object
        .fromEntries(
          Object
          .entries(
            subformContext
          )
          .map(([
            functionName,
            func,
          ]) => ([
            functionName,
            (
              value,
            ) => (
              (
                (
                  func
                  .length
                )
                === 2
              )
              ? (
                func(
                  subformId,
                  value,
                )
              )
              : (
                func(
                  subformId
                )
              )
            ),
          ]))
        )
      ),
      [
        subformContext,
        subformId,
      ],
    )
  )

  return segmentedSubformContext
}
