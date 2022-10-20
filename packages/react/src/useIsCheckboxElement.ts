import {
  ReactElement,
} from 'react'

import {
  useIsHtmlElement,
} from './useIsHtmlElement'

export const useIsCheckboxElement = (
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
      (
        reactElement
        .props
        .type
      )
      === 'checkbox'
    )
  )
}
