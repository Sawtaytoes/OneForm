import {
  useMemo,
} from 'react'

const useIsHtmlElement = (
  children,
) => {
  const isHtmlElement = (
    useMemo(
      () => (
        typeof (
          children
          .type
        )
        === 'string'
      ),
      [
        children,
      ],
    )
  )

  return (
    isHtmlElement
  )
}

export default useIsHtmlElement
