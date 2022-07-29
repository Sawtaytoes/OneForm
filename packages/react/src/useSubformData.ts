import {
  useContext,
  useMemo,
} from 'react'

import {
  SubformContext,
  SubformContextType,
} from './SubformContext'

export const useSubformData = <
  ValueType
>() => {
  const subformId = (
    useMemo(
      () => (
        Symbol()
      ),
      [],
    )
  )

  const subformContext = (
    useContext<
      SubformContextType<
        ValueType
      >
    >(
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
              (
                func
                .length
              )
              === 2
            )
            ? (
              (
                value: (
                  Parameters<
                    typeof func
                  >[1]
                ),
              ) => (
                func(
                  subformId,
                  value,
                )
              )
            )
            : (
              () => (
                func(
                  subformId,
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
