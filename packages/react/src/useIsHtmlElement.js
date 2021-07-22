import {
  useMemo,
} from 'react'

const useIsHtmlElement = ({
  type: reactElementType,
}) => {
  const isHtmlElement = (
    useMemo(
      () => (
        typeof (
          reactElementType
        )
        === 'string'
      ),
      [
        reactElementType,
      ],
    )
  )

  return (
    isHtmlElement
  )
}

export default useIsHtmlElement
