import {
  useMemo,
} from 'react'

const useIsHtmlElement = ({
  type: reactNodeType,
}) => {
  const isHtmlElement = (
    useMemo(
      () => (
        typeof (
          reactNodeType
        )
        === 'string'
      ),
      [
        reactNodeType,
      ],
    )
  )

  return (
    isHtmlElement
  )
}

export default useIsHtmlElement
