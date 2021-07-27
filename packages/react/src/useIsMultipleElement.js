import useIsHtmlElement from './useIsHtmlElement.js'

const useIsMultipleElement = (
  reactElement,
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

export default useIsMultipleElement
