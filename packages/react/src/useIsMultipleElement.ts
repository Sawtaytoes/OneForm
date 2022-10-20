import {
  ReactElement,
} from 'react'

import {
  useIsHtmlElement,
} from './useIsHtmlElement'

export const useIsMultipleElement = (
  reactElement: ReactElement,
) => {
  const isHtmlElement = (
    useIsHtmlElement(
      reactElement
    )
  )

  return (
    isHtmlElement
    && (
      reactElement
      .props
      .multiple
    )
  )
}
