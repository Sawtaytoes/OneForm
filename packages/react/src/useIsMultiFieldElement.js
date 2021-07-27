import useIsHtmlElement from './useIsHtmlElement.js'

const useIsMultiFieldElement = (
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

export default useIsMultiFieldElement
