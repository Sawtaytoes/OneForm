import {
  DependencyList,
  useEffect,
  useRef,
} from 'react'

const defaultProps = {
  callback: () => {},
  dependencies: [],
}

export const useUpdateEffect = (
  callback: (
    Function
  ) = (
    defaultProps
    .callback
  ),
  dependencies: (
    | DependencyList
    | undefined
  ) = (
    defaultProps
    .dependencies
  ),
) => {
  const isFirstUpdateRef = (
    useRef(
      true
    )
  )

  const callbackRef = (
    useRef(
      callback
    )
  )

  callbackRef
  .current = (
    callback
  )

  useEffect(
    () => {
      if (
        isFirstUpdateRef
        .current
      ) {
        isFirstUpdateRef
        .current = (
          false
        )

        return
      }

      return (
        callbackRef
        .current()
      )
    },
    dependencies,
  )
}
