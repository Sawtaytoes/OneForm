import {
  useContext,
} from 'react'

import FieldContext from './FieldContext.js'
import useIsHtmlElement from './useIsHtmlElement.js'

const useSubfield = ({
  children,
}) => {
  const {
    value: inputValue,
  } = (
    children
    .props
  )

  const {
    value,
  } = (
    useContext(
      FieldContext
    )
  )

  const isHtmlElement = (
    useIsHtmlElement(
      children
    )
  )

  return {
    isHtmlElement,
    isSelected: (
      value
      .includes(
        inputValue
      )
    ),
  }
}

export default useSubfield
