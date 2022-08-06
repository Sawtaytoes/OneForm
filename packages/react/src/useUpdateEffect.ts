import {
  useEffect,
  useRef,
} from 'react'

const defaultProps = {
  callback: () => {},
  dependencies: [],
}

export const useUpdateEffect = (
  callback = (
    defaultProps
    .callback
  ),
  dependencies: (
    any[]
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dependencies,
  )
}
