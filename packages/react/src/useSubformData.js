import {
  useContext,
  useMemo,
} from 'react'

import SubformContext from './SubformContext.js'

const useSubformData = () => {
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

  const identifiedSubformContext = (
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
              func(
                subformId,
                value,
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

  return identifiedSubformContext
}

export default useSubformData
