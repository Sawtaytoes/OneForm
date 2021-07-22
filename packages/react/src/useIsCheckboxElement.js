import useIsHtmlElement from './useIsHtmlElement.js'

const checkboxRegex = (
  /.*checkbox.*/i
)

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
    ? (
      (
        reactElement
        .props
        .type
      )
      === 'checkbox'
    )
    : (
      checkboxRegex
      .test(
        (
          reactElement
          ?.displayName
        )
        || (
          reactElement
          ?.type
          ?.displayName
        )
      )
    )
  )
}

export default useIsCheckboxElement
