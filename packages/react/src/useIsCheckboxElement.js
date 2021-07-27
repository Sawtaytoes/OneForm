import useIsHtmlElement from './useIsHtmlElement.js'

const useIsCheckboxElement = (
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
      (
        reactElement
        .props
        .type
      )
      === 'checkbox'
    )
  )
}

export default useIsCheckboxElement
